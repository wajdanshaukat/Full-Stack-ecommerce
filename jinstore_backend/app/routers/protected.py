from fastapi import APIRouter, Depends
from app.auth.auth_bearer import get_current_user
from app.models.user import User
from app.schemas.user import UserOut

router = APIRouter(prefix="/protected", tags=["Protected"])


@router.get("/profile", response_model=UserOut)
def get_profile(current_user: User = Depends(get_current_user)):
    return current_user

@router.get("/me")
def read_current_user(current_user: User = Depends(get_current_user)):
    return {
        "id": current_user.id,
        "email": current_user.email,
        "user_type": current_user.user_type
    }