from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session, joinedload
from typing import List

from app.auth.auth_bearer import get_current_user, get_db
from app.models.user import User
from app.models.wishlist_item import WishlistItem
from app.models.product import Product
from app.schemas.wishlist_item import WishlistItemCreate, WishlistItemResponse

router = APIRouter(prefix="/wishlist", tags=["Wishlist"])


@router.get("/", response_model=List[WishlistItemResponse])
def get_wishlist(db: Session = Depends(get_db), user=Depends(get_current_user)):
    wishlist_items = (
        db.query(WishlistItem)
        .options(joinedload(WishlistItem.product))
        .filter(WishlistItem.user_id == user.id)
        .all()
    )
    return wishlist_items


@router.post("/", response_model=WishlistItemResponse, status_code=status.HTTP_201_CREATED)
def add_to_wishlist(
    item: WishlistItemCreate,
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
):
    existing = db.query(WishlistItem).filter_by(user_id=user.id, product_id=item.product_id).first()
    if existing:
        raise HTTPException(status_code=400, detail="Product already in wishlist")

    wishlist_item = WishlistItem(user_id=user.id, product_id=item.product_id)
    db.add(wishlist_item)
    db.commit()
    db.refresh(wishlist_item)
    return wishlist_item


@router.delete("/{product_id}", status_code=status.HTTP_200_OK)
def remove_from_wishlist(
    product_id: int,
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
):
    deleted = db.query(WishlistItem).filter_by(user_id=user.id, product_id=product_id).delete()
    if not deleted:
        raise HTTPException(status_code=404, detail="Product not found in wishlist")
    db.commit()
    return {"message": "Product removed from wishlist"}


@router.delete("/clear")
def clear_wishlist(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    db.query(WishlistItem).filter(WishlistItem.user_id == current_user.id).delete()
    db.commit()
    return {"message": "Wishlist cleared"}

