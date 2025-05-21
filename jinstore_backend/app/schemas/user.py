from enum import Enum
from pydantic import BaseModel

class UserTypeEnum(str, Enum):
    customer = "customer"
    vendor = "vendor"

class UserCreate(BaseModel):
    email: str
    password: str
    user_type: UserTypeEnum

class UserOut(BaseModel):
    id: int
    email: str
    user_type: UserTypeEnum

class LoginRequest(BaseModel):
    email: str
    password: str

    class Config:
        from_attribute = True
