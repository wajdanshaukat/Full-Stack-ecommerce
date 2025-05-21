from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.orm import relationship
from app.database.base import Base

class UserOrder(Base):
    __tablename__ = "user_orders"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, nullable=False)
    created_at = Column(DateTime, nullable=False)
    placed_at = Column(DateTime, nullable=True)
    shipping_method = Column(String, nullable=False)
    payment_status = Column(String, nullable=False)

    order_details = relationship("OrderDetail", back_populates="order", cascade="all, delete-orphan")