from fastapi import APIRouter, UploadFile, File, Form, Depends
from sqlalchemy.orm import Session
import os
import shutil
from app.database.session import get_db
from app.models.product import Product
from app.models.product_image import ProductImage

from app.utils.validation import get_object_or_404


router = APIRouter(prefix="/product-images", tags=["Product Images"])

UPLOAD_DIR = "static/images"


@router.post("/", status_code=201)
async def upload_product_image(
        product_id: int = Form(...),
        file: UploadFile = File(...),
        db: Session = Depends(get_db)
):
    # Check if product exists
    get_object_or_404(db, Product, Product.id, product_id, "Product not found")

    # Save the file
    os.makedirs(UPLOAD_DIR, exist_ok=True)
    file_location = os.path.join(UPLOAD_DIR, file.filename)

    with open(file_location, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Create image record in the DB
    image_record = ProductImage(product_id=product_id, image_path=f"/static/images/{file.filename}")
    db.add(image_record)
    db.commit()
    db.refresh(image_record)

    return {"detail": "Image uploaded successfully", "image": image_record.image_path}
