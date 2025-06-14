import hashlib
from app.schemas.user import UserCreate
from app.db.base import get_db
from fastapi import Depends

from app.repositories.user import UserRepository

class AuthService:
    def __init__(self, db):
        self.user_repo = UserRepository(db)

    def __hash_password(self, password):
        return hashlib.sha256(password.encode('utf-8')).hexdigest()

    def signup(self, user_data: UserCreate):
        user_data.password = self.__hash_password(user_data.password)
        return self.user_repo.create_user(user_data)