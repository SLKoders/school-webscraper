from fastapi import APIRouter, Depends, HTTPException, status
from app.db.base import get_db
from app.schemas.user import UserCreate
from app.repositories.user import UserRepository

router = APIRouter(prefix='/auth', tags=['auth'])

@router.post('/signup/')
def signup(
    user_data: UserCreate,
    db = Depends(get_db)
):
    user_repo = UserRepository(db)
    
    return user_repo.create_user(user_data)