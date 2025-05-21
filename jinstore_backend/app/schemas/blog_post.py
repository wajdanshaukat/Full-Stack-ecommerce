from pydantic import BaseModel, validator
from typing import Optional
from datetime import datetime

class BlogPostCreate(BaseModel):
    title: str
    description: str
    author_name: str

class BlogPostUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    author_name: Optional[str] = None

class BlogPost(BaseModel):
    id: int
    title: str
    description: str
    author_name: str
    upload_date: datetime
    image_path: str

    @validator("image_path", pre=True)
    def prepend_host(cls, v):
        if not v.startswith("http"):
            return f"http://localhost:8000{v}"
        return v

    class Config:
        form_attribute = True
