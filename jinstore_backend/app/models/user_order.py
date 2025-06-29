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

    shipping_first_name = Column(String, nullable=True)
    shipping_last_name = Column(String, nullable=True)
    shipping_company_name = Column(String, nullable=True)
    shipping_phone_number = Column(String, nullable=True)
    shipping_address_line_1 = Column(String, nullable=True)
    shipping_address_line_2 = Column(String, nullable=True)
    shipping_city = Column(String, nullable=True)
    shipping_state = Column(String, nullable=True)
    shipping_zip_code = Column(String, nullable=True)
    shipping_country = Column(String, nullable=True)

    order_details = relationship("OrderDetail", back_populates="order", cascade="all, delete-orphan")