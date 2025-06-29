from pydantic import BaseModel
from typing import Optional

from app.schemas.product import Product

class CartItemBase(BaseModel):
    product_id: int
    quantity: int = 1

class CartItemCreate(CartItemBase):
    pass

class CartItemResponse(BaseModel):
    id: int
    user_id: int
    product_id: int
    quantity: int
    product: Optional[Product]

    class Config:
        orm_mode = True
