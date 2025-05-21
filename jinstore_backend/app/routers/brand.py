from fastapi import APIRouter, Depends, Path
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.schemas.brand import Brand, BrandCreate, BrandUpdate
from app.models.brand import Brand as BrandModel
from app.database.session import get_db

from app.utils.validation import custom_validate, get_object_or_404


router = APIRouter(prefix="/brands", tags=["Brands"])


@router.post("/", response_model=Brand, status_code=201)
def create_brand(brand: BrandCreate, db: Session = Depends(get_db)):
    custom_validate(db, BrandModel, func.lower(BrandModel.name), brand.name.lower(), "Brand already exists")

    db_brand = BrandModel(**brand.dict())
    db.add(db_brand)
    db.commit()
    db.refresh(db_brand)
    return db_brand


@router.get("/", response_model=list[Brand])
def get_all_brands(db: Session = Depends(get_db)):
    return db.query(BrandModel).all()


@router.get("/{brand_id}", response_model=Brand)
def get_brand(brand_id: int = Path(..., gt=0), db: Session = Depends(get_db)):
    brand = get_object_or_404(db, BrandModel, BrandModel.id, brand_id, "Brand not found.")
    return brand



@router.put("/{brand_id}", response_model=Brand)
def update_brand(brand_id: int, updated_data: BrandUpdate, db: Session = Depends(get_db)):
    brand = get_object_or_404(db, BrandModel, BrandModel.id, brand_id, "Brand not found.")

    if "name" in updated_data.dict(exclude_unset=True):
        custom_validate(db, BrandModel, func.lower(BrandModel.name), updated_data.name.lower(),
                        "Brand name already exists")

    for field, value in updated_data.dict(exclude_unset=True).items():
        setattr(brand, field, value)

    db.commit()
    db.refresh(brand)
    return brand


@router.delete("/{brand_id}", status_code=200)
def delete_brand(brand_id: int, db: Session = Depends(get_db)):
    brand = get_object_or_404(db, BrandModel, BrandModel.id, brand_id, "Brand not found.")

    db.delete(brand)
    db.commit()
    return {"detail": "Brand deleted successfully."}
