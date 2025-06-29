from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship
from app.database.base import Base

class WishlistItem(Base):
    __tablename__ = "wishlist_items"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"))
    product_id = Column(Integer, ForeignKey("products.id", ondelete="CASCADE"))

    user = relationship("User", back_populates="wishlist_items")
    product = relationship("Product")