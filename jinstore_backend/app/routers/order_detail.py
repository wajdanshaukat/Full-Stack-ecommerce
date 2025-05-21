from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.schemas.order_detail import OrderDetailCreate, OrderDetail as OrderDetailSchema
from app.models.order_detail import OrderDetail as OrderDetailModel
from app.models.user_order import UserOrder as UserOrderModel
from app.auth.auth_bearer import get_current_user
from app.models.user import User
from app.database.session import get_db

router = APIRouter(prefix="/order-details", tags=["Order Details"])


# Create a new order detail
@router.post("/", response_model=OrderDetailSchema, status_code=status.HTTP_201_CREATED)
def create_order_detail(
    order_detail: OrderDetailCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Ensure the order belongs to the current user
    order = db.query(UserOrderModel).filter(UserOrderModel.id == order_detail.order_id).first()
    if not order or order.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to add items to this order")

    new_detail = OrderDetailModel(**order_detail.dict())
    db.add(new_detail)
    db.commit()
    db.refresh(new_detail)
    return new_detail


# Get all order details for an order
@router.get("/by-order/{order_id}", response_model=List[OrderDetailSchema])
def get_order_details_by_order_id(
    order_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    order = db.query(UserOrderModel).filter(UserOrderModel.id == order_id).first()
    if not order or order.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to view this order's details")

    details = db.query(OrderDetailModel).filter(OrderDetailModel.order_id == order_id).all()
    return details


# Get a single order detail by ID
@router.get("/{order_detail_id}", response_model=OrderDetailSchema)
def get_order_detail(
    order_detail_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    detail = db.query(OrderDetailModel).filter(OrderDetailModel.id == order_detail_id).first()
    if not detail:
        raise HTTPException(status_code=404, detail="Order detail not found")
    if detail.order.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to view this item")

    return detail


# Update an order detail
@router.put("/{order_detail_id}", response_model=OrderDetailSchema)
def update_order_detail(
    order_detail_id: int,
    updated_data: OrderDetailCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    detail = db.query(OrderDetailModel).filter(OrderDetailModel.id == order_detail_id).first()
    if not detail:
        raise HTTPException(status_code=404, detail="Order detail not found")
    if detail.order.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to update this item")

    for key, value in updated_data.dict().items():
        setattr(detail, key, value)

    db.commit()
    db.refresh(detail)
    return detail


# Delete an order detail
@router.delete("/{order_detail_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_order_detail(
    order_detail_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    detail = db.query(OrderDetailModel).filter(OrderDetailModel.id == order_detail_id).first()
    if not detail:
        raise HTTPException(status_code=404, detail="Order detail not found")
    if detail.order.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to delete this item")

    db.delete(detail)
    db.commit()
    return None
