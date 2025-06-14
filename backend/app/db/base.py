import os

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DATABASE_URL = os.environ.get('DATABASE_URL')

if DATABASE_URL is None:
    raise ConnectionError(f"DATABASE_URL is not valid: \n({DATABASE_URL})")

engine = create_engine(
    DATABASE_URL
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

from app.models import user

Base.metadata.create_all(engine)

def get_db():
    db = SessionLocal()
    try: 
        yield db
    finally:
        db.close()