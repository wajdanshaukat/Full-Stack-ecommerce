from sqlalchemy import Column, Integer, String
from app.database.base import Base
from sqlalchemy.orm import relationship


class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    user_type = Column(String, nullable=False)

# New profile fields
    firstName = Column(String, nullable=True)
    lastName = Column(String, nullable=True)
    companyName = Column(String, nullable=True)
    phone = Column(String, nullable=True)
    streetAddress = Column(String, nullable=True)
    apartment = Column(String, nullable=True)
    town = Column(String, nullable=True)
    state = Column(String, nullable=True)
    zipCode = Column(String, nullable=True)
    country = Column(String, nullable=True)

    wishlist_items = relationship("WishlistItem", back_populates="user", cascade="all, delete-orphan")
    cart_items = relationship("CartItem", back_populates="user", cascade="all, delete")
