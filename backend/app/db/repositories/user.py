from sqlalchemy import Boolean, Column, Integer, UUID, String
from app.db.base import Base

class User(Base):
    __tablename__ = "users"
    
    id = Column(UUID, primary_key=True, index=True)
    email = Column(String)
    password = Column(String)
    is_active = Column(Boolean, default=True)