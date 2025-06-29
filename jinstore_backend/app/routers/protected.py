from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.auth.auth_bearer import get_current_user
from app.database.base import SessionLocal
from app.models.user import User
from app.schemas.user import UserOut, UserUpdate

router = APIRouter(prefix="/protected", tags=["Protected"])

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Get full user profile (authenticated)
@router.get("/profile", response_model=UserOut)
def get_profile(current_user: User = Depends(get_current_user)):
    return current_user

# Get basic user info (minimal)
@router.get("/me")
def read_current_user(current_user: User = Depends(get_current_user)):
    return {
        "id": current_user.id,
        "email": current_user.email,
        "user_type": current_user.user_type
    }

@router.put("/update-profile", response_model=UserOut)
def update_profile(
    update_data: UserUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    user = db.query(User).filter(User.id == current_user.id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    for field, value in update_data.dict(exclude_unset=True).items():
        setattr(user, field, value)

    db.commit()
    db.refresh(user)
    return user

# New: Complete profile via POST
@router.post("/complete-profile", response_model=UserOut)
def complete_profile(
    update_data: UserUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    user = db.query(User).filter(User.id == current_user.id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    for field, value in update_data.dict(exclude_unset=True).items():
        setattr(user, field, value)

    db.commit()
    db.refresh(user)
    return user
