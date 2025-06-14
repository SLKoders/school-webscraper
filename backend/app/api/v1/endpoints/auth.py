from fastapi import APIRouter, Depends, HTTPException, status
from app.db.base import get_db
from app.schemas.user import UserCreate
from app.repositories.user import UserRepository
from app.services.auth import AuthService

router = APIRouter(prefix='/auth', tags=['auth'])

@router.post('/signup/')
def signup(user_data: UserCreate, db = Depends(get_db)):
    auth_service = AuthService(db)
    return auth_service.signup(user_data)