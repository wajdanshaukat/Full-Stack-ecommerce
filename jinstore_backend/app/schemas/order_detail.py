from pydantic import BaseModel

class OrderDetailCreate(BaseModel):
    product_id: int
    product_name: str
    unit_price: float
    quantity: int

# Optional: response model
class OrderDetail(BaseModel):
    id: int
    product_id: int
    product_name: str
    unit_price: float
    quantity: int
    order_id: int

    class Config:
        form_attribute = True
