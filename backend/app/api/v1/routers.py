from fastapi import APIRouter
from app.api.v1.endpoints import webscraper

api_router = APIRouter()

api_router = APIRouter()
api_router.include_router(webscraper.router)