from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session, joinedload
from datetime import datetime
from typing import List

from app.schemas.user_order import UserOrderCreate, UserOrder
from app.auth.auth_bearer import get_current_user
from app.models.user import User
from app.models.user_order import UserOrder as UserOrderModel
from app.models.order_detail import OrderDetail as OrderDetailModel
from app.database.session import SessionLocal, get_db

router = APIRouter(prefix="/orders", tags=["Orders"])


@router.post("/", response_model=UserOrder, status_code=status.HTTP_201_CREATED)
def create_order(order_data: UserOrderCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    new_order = UserOrderModel(
        user_id=current_user.id,
        payment_status=order_data.payment_status,
        shipping_method=order_data.shipping_method,
        created_at=datetime.utcnow(),
        placed_at=datetime.utcnow(),

        shipping_first_name = order_data.shipping_first_name,
        shipping_last_name = order_data.shipping_last_name,
        shipping_company_name = order_data.shipping_company_name,
        shipping_phone_number = order_data.shipping_phone_number,
        shipping_address_line_1 = order_data.shipping_address_line_1,
        shipping_address_line_2 = order_data.shipping_address_line_2,
        shipping_city = order_data.shipping_city,
        shipping_state = order_data.shipping_state,
        shipping_zip_code = order_data.shipping_zip_code,
        shipping_country = order_data.shipping_country,
    )

    db.add(new_order)
    db.flush()

    for detail in order_data.order_details:
        order_detail = OrderDetailModel(
            product_id=detail.product_id,
            product_name=detail.product_name,
            unit_price=detail.unit_price,
            quantity=detail.quantity,
            order_id=new_order.id
        )
        db.add(order_detail)

    db.commit()
    db.refresh(new_order)
    return new_order


@router.get("/", response_model=List[UserOrder])
def get_my_orders(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    orders = db.query(UserOrderModel).filter(UserOrderModel.user_id == current_user.id).all()
    return orders


@router.get("/{order_id}", response_model=UserOrder)
def get_order(order_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    order = (db.query(UserOrderModel)
             .options(joinedload(UserOrderModel.order_details))
             .filter(UserOrderModel.id == order_id, UserOrderModel.user_id == current_user.id).first())
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order


@router.delete("/delete_all_orders", status_code=status.HTTP_200_OK)
def delete_all_orders_and_details(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Get all user orders
    user_orders = db.query(UserOrderModel).filter(UserOrderModel.user_id == current_user.id).all()
    order_ids = [order.id for order in user_orders]

    if not order_ids:
        return {"detail": "No orders found to delete."}

    # Delete all order details linked to these orders
    db.query(OrderDetailModel).filter(OrderDetailModel.order_id.in_(order_ids)).delete(synchronize_session=False)

    # Delete all user orders
    db.query(UserOrderModel).filter(UserOrderModel.id.in_(order_ids)).delete(synchronize_session=False)

    db.commit()
    return {"detail": f"Deleted {len(order_ids)} orders and their details."}



@router.delete("/{order_id}")
def delete_order(order_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    order = db.query(UserOrderModel).filter(UserOrderModel.id == order_id, UserOrderModel.user_id == current_user.id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    db.delete(order)
    db.commit()
    return {"detail": "Order deleted successfully"}
