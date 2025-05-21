from datetime import datetime
from sqlalchemy import Column, Integer, String, Float, Boolean, ForeignKey, Text, DateTime
from sqlalchemy.orm import relationship
from app.database.base import Base
# from slugify import slugify


class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(Text, nullable=True)
    sku = Column(String, unique=True, index=True)
    category_id = Column(Integer, ForeignKey("product_categories.id"))
    brand_id = Column(Integer, ForeignKey("brands.id"))
    unit_price = Column(Float)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    category = relationship("ProductCategory", back_populates="products")
    brand = relationship("Brand", back_populates="products")

    images = relationship("ProductImage", back_populates="product", cascade="all, delete-orphan")

