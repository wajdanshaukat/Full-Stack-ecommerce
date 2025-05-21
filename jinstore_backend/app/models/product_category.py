from datetime import datetime
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from app.database.base import Base

class ProductCategory(Base):
    __tablename__ = "product_categories"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False, unique=True)
    description = Column(String)
    parent_id = Column(Integer, ForeignKey("product_categories.id"), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    image_path = Column(String, nullable=False)

    products = relationship("Product", back_populates="category")
    parent = relationship("ProductCategory", remote_side=[id], backref="subcategories")