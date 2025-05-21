from typing import Optional

from fastapi import APIRouter, UploadFile, File, Form, Depends, HTTPException, Path
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.models.blog_post import BlogPost as BlogPostModel
from app.schemas.blog_post import BlogPost, BlogPostCreate, BlogPostUpdate
import os, shutil

router = APIRouter(prefix="/blogs", tags=["Blog Posts"])

UPLOAD_DIR = os.path.join(os.path.dirname(__file__), "../static/images/blogs")
os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/", response_model=BlogPost, status_code=201)
def create_blog_post(
    title: str = Form(...),
    description: str = Form(...),
    author_name: str = Form(...),
    image: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    image_path = os.path.join(UPLOAD_DIR, image.filename)
    with open(image_path, "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)

    blog = BlogPostModel(
        title=title,
        description=description,
        author_name=author_name,
        image_path=f"/static/images/blogs/{image.filename}"
    )
    db.add(blog)
    db.commit()
    db.refresh(blog)
    return blog


@router.get("/", response_model=list[BlogPost])
def get_all_blogs(db: Session = Depends(get_db)):
    return db.query(BlogPostModel).order_by(BlogPostModel.upload_date.desc()).all()


@router.get("/{blog_id}", response_model=BlogPost)
def get_blog(blog_id: int = Path(..., gt=0), db: Session = Depends(get_db)):
    blog = db.query(BlogPostModel).filter(BlogPostModel.id == blog_id).first()
    if not blog:
        raise HTTPException(status_code=404, detail="Blog post not found")
    return blog


@router.put("/{blog_id}", response_model=BlogPost)
def update_blog_post(
    blog_id: int,
    title: Optional[str] = Form(None),
    description: Optional[str] = Form(None),
    author_name: Optional[str] = Form(None),
    image: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db)
):
    blog = db.query(BlogPostModel).filter(BlogPostModel.id == blog_id).first()
    if not blog:
        raise HTTPException(status_code=404, detail="Blog post not found")

    if image:
        old_path = os.path.join(os.path.dirname(__file__), "..", blog.image_path.lstrip("/"))
        if os.path.exists(old_path):
            os.remove(old_path)

        new_image_path = os.path.join(UPLOAD_DIR, image.filename)
        with open(new_image_path, "wb") as buffer:
            shutil.copyfileobj(image.file, buffer)

        blog.image_path = f"/static/images/blogs/{image.filename}"

    if title:
        blog.title = title
    if description:
        blog.description = description
    if author_name:
        blog.author_name = author_name

    db.commit()
    db.refresh(blog)
    return blog


@router.delete("/{blog_id}")
def delete_blog_post(blog_id: int, db: Session = Depends(get_db)):
    blog = db.query(BlogPostModel).filter(BlogPostModel.id == blog_id).first()
    if not blog:
        raise HTTPException(status_code=404, detail="Blog post not found")

    image_path = os.path.join(os.path.dirname(__file__), "..", blog.image_path.lstrip("/"))
    if os.path.exists(image_path):
        os.remove(image_path)

    db.delete(blog)
    db.commit()
    return {"detail": "Blog post deleted successfully"}
