from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
from .order_detail import OrderDetailCreate, OrderDetail
from app.schemas.enums import PaymentStatusEnum, ShippingMethodEnum



class UserOrderBase(BaseModel):
    payment_status: PaymentStatusEnum
    shipping_method: ShippingMethodEnum

    shipping_first_name : Optional[str] = None
    shipping_last_name : Optional[str] = None
    shipping_company_name : Optional[str] = None
    shipping_phone_number : Optional[str] = None
    shipping_address_line_1 : Optional[str] = None
    shipping_address_line_2 : Optional[str] = None
    shipping_city : Optional[str] = None
    shipping_state : Optional[str] = None
    shipping_zip_code : Optional[str] = None
    shipping_country : Optional[str] = None


class UserOrderCreate(UserOrderBase):
    order_details: Optional[List[OrderDetailCreate]] = None


class UserOrder(UserOrderBase):
    id: int
    placed_at: Optional[datetime] = None
    order_details: List[OrderDetail]

    class Config:
        form_attribute = True
