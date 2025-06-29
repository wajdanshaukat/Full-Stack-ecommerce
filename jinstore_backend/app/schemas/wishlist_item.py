from pydantic import BaseModel
from typing import Optional

from app.schemas.product import Product

class WishlistItemBase(BaseModel):
    product_id: int

class WishlistItemCreate(WishlistItemBase):
    pass

class WishlistItemResponse(BaseModel):
    id: int
    user_id: int
    product_id: int
    product: Optional[Product]

    class Config:
        orm_mode = True
