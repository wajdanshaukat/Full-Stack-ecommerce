from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session, joinedload
from typing import List

from app.auth.auth_bearer import get_current_user, get_db
from app.models.cart_item import CartItem
from app.models.product import Product
from app.models.user import User
from app.schemas.cart_item import CartItemCreate, CartItemResponse

router = APIRouter(prefix="/cart", tags=["Cart"])


@router.get("/", response_model=List[CartItemResponse])
def get_cart(db: Session = Depends(get_db), user=Depends(get_current_user)):
    cart_items = (
        db.query(CartItem)
        .options(joinedload(CartItem.product))
        .filter(CartItem.user_id == user.id)
        .all()
    )
    return cart_items


@router.post("/", response_model=CartItemResponse)
def add_to_cart(
    item: CartItemCreate,
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
):
    existing = db.query(CartItem).filter_by(user_id=user.id, product_id=item.product_id).first()
    if existing:
        existing.quantity += item.quantity
        db.commit()
        db.refresh(existing)
        return existing

    cart_item = CartItem(user_id=user.id, product_id=item.product_id, quantity=item.quantity)
    db.add(cart_item)
    db.commit()
    db.refresh(cart_item)
    return cart_item


@router.delete("/{product_id}", status_code=status.HTTP_200_OK)
def remove_from_cart(product_id: int, db: Session = Depends(get_db), user=Depends(get_current_user)):
    deleted = db.query(CartItem).filter_by(user_id=user.id, product_id=product_id).delete()
    if not deleted:
        raise HTTPException(status_code=404, detail="Product not found in cart")
    db.commit()
    return {"message": "Product removed from cart"}


@router.delete("/clear")
def clear_cart(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    db.query(CartItem).filter(CartItem.user_id == current_user.id).delete()
    db.commit()
    return {"message": "Cart cleared"}
