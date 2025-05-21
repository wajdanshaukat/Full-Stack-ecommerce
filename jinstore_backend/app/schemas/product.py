from pydantic import BaseModel, validator
from typing import List

from app.schemas.brand import Brand
from app.schemas.product_category import ProductCategory


class ProductImage(BaseModel):
    id: int
    image_path: str

    @validator("image_path", pre=True)
    def prepend_host(cls, v, values, **kwargs):
        if not v.startswith("http"):
            return f"http://localhost:8000{v}"
        return v

    class Config:
        form_attribute = True

class Product(BaseModel):
    id: int
    name: str
    description: str
    sku: str
    category_id: int
    brand_id: int
    unit_price: float
    is_active: bool
    # slug: str
    category: ProductCategory
    brand: Brand
    images: List[ProductImage] = []

    class Config:
        form_attribute = True
