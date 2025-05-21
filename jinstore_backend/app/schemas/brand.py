from pydantic import BaseModel

class BrandCreate(BaseModel):
    name: str
    description: str

class BrandUpdate(BaseModel):
    name: str | None = None
    description: str | None = None

# Schema for response
class Brand(BrandCreate):
    id: int

    class Config:
        from_attributes = True