from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from app.database.base import Base

class BlogPost(Base):
    __tablename__ = "blog_posts"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=False)
    author_name = Column(String, nullable=False)
    upload_date = Column(DateTime, default=datetime.utcnow)
    image_path = Column(String, nullable=False)
