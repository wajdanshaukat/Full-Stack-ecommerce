from pydantic import BaseModel


class ProductImage(BaseModel):
    id: int
    image_path: str

    class Config:
        from_attributes = True


class ProductImageCreate(BaseModel):
    image_path: str