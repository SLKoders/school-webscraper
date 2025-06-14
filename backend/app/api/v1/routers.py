from fastapi import APIRouter
from app.api.v1.endpoints import webscraper
from app.api.v1.endpoints import auth

api_router = APIRouter()

api_router = APIRouter()
api_router.include_router(webscraper.router)
api_router.include_router(auth.router)