from fastapi import APIRouter, Depends, HTTPException, status
from app.services.webscraper import Webscraper
from typing import List

router = APIRouter(prefix='/webscraper', tags=['webscraper'])
webscraper = Webscraper()

@router.get('/search/{query}')
async def search(query: str):
    return webscraper.search(query)