from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship
from app.database.base import Base

class OrderDetail(Base):
    __tablename__ = "order_details"

    id = Column(Integer, primary_key=True, index=True)
    product_id = Column(Integer, nullable=False)
    product_name = Column(String, nullable=False)
    unit_price = Column(Float, nullable=False)
    quantity = Column(Integer, nullable=False)

    order_id = Column(Integer, ForeignKey("user_orders.id"))
    order = relationship("UserOrder", back_populates="order_details")