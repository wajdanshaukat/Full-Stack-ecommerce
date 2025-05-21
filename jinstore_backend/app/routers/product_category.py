from typing import Optional

from fastapi import APIRouter, Depends, Path,  Form, UploadFile, File
from sqlalchemy.orm import Session
from app.schemas.product_category import ProductCategory, ProductCategoryCreate, ProductCategoryUpdate
from app.models.product_category import ProductCategory as ProductCategoryModel
from app.database.session import get_db
from app.utils.validation import custom_validate, get_object_or_404
import os, shutil


router = APIRouter(prefix="/categories", tags=["Product Categories"])


# Create category (with optional parent category)
@router.post("/", response_model=ProductCategory, status_code=201)
def create_category(
    name: str = Form(...),
    description: str = Form(...),
    parent_id: Optional[int] = Form(None),
    image: UploadFile = File(...),
    db: Session = Depends(get_db),
    ):
    category_data = ProductCategoryCreate(
        name=name,
        description=description,
        parent_id=parent_id
    )

    custom_validate(db, ProductCategoryModel, ProductCategoryModel.name, category_data.name, "Category already exists")

    upload_folder = os.path.join(os.path.dirname(__file__), "../static/images/categories")
    os.makedirs(upload_folder, exist_ok=True)

    # Create full path to save image
    image_path = os.path.join(upload_folder, image.filename)
    with open(image_path, "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)

    # Save relative path for serving via /static
    db_category = ProductCategoryModel(
        name=category_data.name,
        description=category_data.description,
        parent_id=category_data.parent_id,
        image_path=f"/static/images/categories/{image.filename}"
    )

    db.add(db_category)
    db.commit()
    db.refresh(db_category)
    return db_category


@router.get("/", response_model=list[ProductCategory])
def get_all_categories(db: Session = Depends(get_db)):
    return db.query(ProductCategoryModel).all()


# Get category with its subcategories
@router.get("/{category_id}", response_model=ProductCategory)
def get_category(category_id: int = Path(..., gt=0), db: Session = Depends(get_db)):
    category = get_object_or_404(db, ProductCategoryModel, ProductCategoryModel.id, category_id, "Category not found")
    return category

@router.put("/{category_id}", response_model=ProductCategoryUpdate)
def update_category(
    category_id: int,
    name: Optional[str] = Form(None),
    description: Optional[str] = Form(None),
    parent_id: Optional[int] = Form(None),
    image: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db)):

    category = get_object_or_404(db, ProductCategoryModel, ProductCategoryModel.id, category_id, "Category not found")


    if name:
        custom_validate(db, ProductCategoryModel, ProductCategoryModel.name, name, "Category name already exists")

    if image:
        # Delete old image if it exists
        if category.image_path:
            old_path = os.path.join(os.path.dirname(__file__), "..", category.image_path.lstrip("/"))
            if os.path.exists(old_path):
                os.remove(old_path)

        # Save new image in correct location
        upload_folder = os.path.join(os.path.dirname(__file__), "../static/images/categories")
        os.makedirs(upload_folder, exist_ok=True)

        image_path = os.path.join(upload_folder, image.filename)
        with open(image_path, "wb") as buffer:
            shutil.copyfileobj(image.file, buffer)

        # Set path to be served by FastAPI
        category.image_path = f"/static/images/categories/{image.filename}"

    # Update other fields
    if name is not None:
        category.name = name
    if description is not None:
        category.description = description
    if parent_id is not None:
        category.parent_id = parent_id

    db.commit()
    db.refresh(category)
    return category

@router.delete("/{category_id}", status_code=200)
def delete_category(category_id: int, db: Session = Depends(get_db)):
    category = get_object_or_404(db, ProductCategoryModel, ProductCategoryModel.id, category_id, "Category not found")

    if category.subcategories:
        return {"detail": "Category has subcategories and cannot be deleted."}

    db.delete(category)
    db.commit()
    return {"detail": "Category deleted successfully."}
