from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from starlette import status

from app.auth.auth_handler import create_access_token, verify_password
from app.schemas.user import UserCreate, UserOut,LoginRequest
from app.models.user import User
from app.database.session import SessionLocal
from app.auth import auth_handler
from passlib.context import CryptContext

router = APIRouter(prefix="/auth", tags=["Auth"])

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/register", response_model=UserOut)
def register(user: UserCreate, db: Session = Depends(get_db), USER_TYPE_MAP=None):
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    # Convert int to string (if needed)
    user_type_str = USER_TYPE_MAP.get(user.user_type) if isinstance(user.user_type, int) else user.user_type

    hashed_password = auth_handler.get_password_hash(user.password)
    new_user = User(
        email=user.email,
        hashed_password=hashed_password,
        user_type=user_type_str
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


@router.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    email = form_data.username

    user = db.query(User).filter(User.email == email).first()

    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )

    access_token = create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}

@router.delete("/delete-user/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    db.delete(user)
    db.commit()
    return {"detail": f"User with ID {user_id} deleted successfully"}

@router.delete("/delete-all-users")
def delete_all_users(db: Session = Depends(get_db)):
    users = db.query(User).all()
    if not users:
        raise HTTPException(status_code=404, detail="No users found to delete")

    db.query(User).delete()
    db.commit()
    return {"detail": "All users deleted"}
