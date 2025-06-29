from enum import Enum
from typing import Optional
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
    firstName: Optional[str]
    lastName: Optional[str]
    companyName: Optional[str]
    phone: Optional[str]
    streetAddress: Optional[str]
    apartment: Optional[str]
    town: Optional[str]
    state: Optional[str]
    zipCode: Optional[str]
    country: Optional[str]

class LoginRequest(BaseModel):
    email: str
    password: str

    class Config:
        from_attribute = True

class UserUpdate(BaseModel):
    firstName: Optional[str]
    lastName: Optional[str]
    companyName: Optional[str]
    phone: Optional[str]
    streetAddress: Optional[str]
    apartment: Optional[str]
    town: Optional[str]
    state: Optional[str]
    zipCode: Optional[str]
    country: Optional[str]