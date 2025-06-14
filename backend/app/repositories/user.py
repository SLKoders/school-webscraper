from sqlalchemy.orm import Session
from app.db.base import Base
from app.models.user import User
from app.schemas.user import UserCreate

class UserRepository:
    
    def __init__(self, db: Session):
        self.db = db
        
    def create_user(self, user_data: UserCreate) -> User:
        db_user = User(
            email=user_data.email,
            password=user_data.password
        )
        
        self.db.add(db_user)
        self.db.commit()
        self.db.refresh(db_user)
        
        return db_user