from fastapi import Form
from pydantic import BaseModel, validator
from typing import List, Optional


class ProductCategoryCreate(BaseModel):
    name: str
    description: str
    parent_id: Optional[int] = Form(None)


class ProductCategoryUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    parent_id: Optional[int]


class ProductCategory(ProductCategoryCreate):
    id: int
    image_path: Optional[str] = None
    subcategories: List["ProductCategory"] = []

    @validator("image_path", pre=True)
    def prepend_host(cls, v, values, **kwargs):
        if not v.startswith("http"):
            return f"http://localhost:8000{v}"
        return v

    class Config:
        form_attribute = True