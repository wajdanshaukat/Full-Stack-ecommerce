from fastapi import APIRouter, Depends, HTTPException, Form, UploadFile, File, Query, status
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from app.database.session import get_db
from app.models.product import Product as ProductModel
from app.models.product_image import ProductImage
from app.schemas.product import Product as ProductSchema
from typing import List, Optional
import os, shutil


from app.utils.validation import custom_validate, get_object_or_404

router = APIRouter(prefix="/products", tags=["Products"])


@router.post("/", response_model=ProductSchema, status_code=201)
def create_product(
    name: str = Form(...),
    description: Optional[str] = Form(None),
    sku: str = Form(...),
    category_id: int = Form(...),
    brand_id: int = Form(...),
    unit_price: float = Form(...),
    is_active: Optional[bool] = Form(True),
    db: Session = Depends(get_db),
    images: List[UploadFile] = File(...)
):
    custom_validate(db, ProductModel, ProductModel.sku, sku, "SKU already exists")
    custom_validate(db, ProductModel, ProductModel.name, name, "Product name already exists")


    try:
        db_product = ProductModel(
            name=name,
            description=description,
            sku=sku,
            category_id=category_id,
            brand_id=brand_id,
            unit_price=unit_price,
            is_active=is_active
        )
        db.add(db_product)
        db.commit()
        db.refresh(db_product)

        # upload_folder = "static/images"
        # os.makedirs(upload_folder, exist_ok=True)

        upload_folder = "app/static/images/products"
        os.makedirs(upload_folder, exist_ok=True)

        for image in images:
            file_path = os.path.join(upload_folder, image.filename)

            with open(file_path, "wb") as buffer:
                shutil.copyfileobj(image.file, buffer)

            # Save only the PUBLIC path in the database for frontend access
            relative_path = f"/static/images/products/{image.filename}"

            image_record = ProductImage(product_id=db_product.id, image_path=relative_path)
            db.add(image_record)

        db.commit()
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail="Integrity error while creating product")

    db.refresh(db_product)
    return db_product


# @router.get("/", response_model=List[ProductSchema])
# def get_products(db: Session = Depends(get_db)):
#     return db.query(ProductModel).all()


@router.get("/", response_model=List[ProductSchema])
def get_products(
    name: Optional[str] = Query(None),
    min_price: Optional[float] = Query(None),
    max_price: Optional[float] = Query(None),
    category_id: Optional[str] = Query(None),
    sort: Optional[str] = None,
    db: Session = Depends(get_db)
):
    query = db.query(ProductModel)

    if name:
        query = query.filter(ProductModel.name.ilike(f"%{name}%"))
    if min_price is not None:
        query = query.filter(ProductModel.unit_price >= min_price)
    if max_price is not None:
        query = query.filter(ProductModel.unit_price <= max_price)
    if category_id is not None:
        category_ids = [int(id) for id in category_id.split(",")]
        query = query.filter(ProductModel.category_id.in_(category_ids))
    if sort == "low-to-high":
        query = query.order_by(ProductModel.unit_price.asc())
    elif sort == "high-to-low":
        query = query.order_by(ProductModel.unit_price.desc())


    product =  query.all()

    if any([name, min_price is not None, max_price is not None, category_id]) and not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No products found matching the given criteria"
        )

    return product

@router.get("/{product_id}", response_model=ProductSchema)
def get_product(product_id: int, db: Session = Depends(get_db)):
    product = get_object_or_404(db, ProductModel, ProductModel.id, product_id, "Product not found")
    return product


@router.put("/{product_id}", response_model=ProductSchema)
def update_product(
    product_id: int,
    name: Optional[str] = Form(None),
    description: Optional[str] = Form(None),
    sku: Optional[str] = Form(None),
    category_id: Optional[int] = Form(None),
    brand_id: Optional[int] = Form(None),
    unit_price: Optional[float] = Form(None),
    is_active: Optional[bool] = Form(None),
    images: Optional[List[UploadFile]] = File(None),
    db: Session = Depends(get_db),
):
    product = get_object_or_404(db, ProductModel, ProductModel.id, product_id, "Product not found")

    if sku:
        custom_validate(db, ProductModel, ProductModel.sku, sku, "SKU already exists")
    if name:
        custom_validate(db, ProductModel, ProductModel.name, name, "Product name already exists")

    updates = {
        "name": name,
        "description": description,
        "sku": sku,
        "category_id": category_id,
        "brand_id": brand_id,
        "unit_price": unit_price,
        "is_active": is_active,
    }

    for field, value in updates.items():
        if value is not None:
            setattr(product, field, value)

    try:
        if images:
            # Delete old images from DB and disk
            for img in product.images:
                db.delete(img)
                if img.image_path:
                    old_path = os.path.join(os.path.dirname(__file__), "..", img.image_path.lstrip("/"))
                    if os.path.exists(old_path):
                        os.remove(old_path)

            # Upload new images to correct folder
            upload_folder = os.path.join(os.path.dirname(__file__), "../static/images/products")
            os.makedirs(upload_folder, exist_ok=True)

            for image in images:
                file_location = os.path.join(upload_folder, image.filename)
                with open(file_location, "wb") as buffer:
                    shutil.copyfileobj(image.file, buffer)

                image_record = ProductImage(
                    product_id=product.id,
                    image_path=f"/static/images/products/{image.filename}"
                )
                db.add(image_record)

        db.commit()
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail="Integrity error while updating product")

    db.refresh(product)
    return product


@router.delete("/{product_id}")
def delete_product(product_id: int, db: Session = Depends(get_db)):
    product = get_object_or_404(db, ProductModel, ProductModel.id, product_id, "Product not found")
    db.delete(product)
    db.commit()
    return {"message": "Product deleted successfully"}
