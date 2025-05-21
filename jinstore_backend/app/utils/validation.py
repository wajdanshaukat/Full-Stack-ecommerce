from fastapi import HTTPException
from sqlalchemy import func
from sqlalchemy.orm import Session


def custom_validate(db, model, key, value, message):
    existing = db.query(model).filter(func.lower(key) == value.lower()).first()
    if existing:
        raise HTTPException(status_code=400, detail=message)


def get_object_or_404(db: Session, model, key, value, message):
    obj = db.query(model).filter(key == value).first()
    if not obj:
        raise HTTPException(status_code=404, detail=message)
    return obj