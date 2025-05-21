from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
from .order_detail import OrderDetailCreate, OrderDetail
from app.schemas.enums import PaymentStatusEnum, ShippingMethodEnum



class UserOrderBase(BaseModel):
    payment_status: PaymentStatusEnum
    shipping_method: ShippingMethodEnum


class UserOrderCreate(UserOrderBase):
    order_details: Optional[List[OrderDetailCreate]] = None


class UserOrder(UserOrderBase):
    id: int
    placed_at: Optional[datetime] = None
    order_details: List[OrderDetail]

    class Config:
        form_attribute = True
