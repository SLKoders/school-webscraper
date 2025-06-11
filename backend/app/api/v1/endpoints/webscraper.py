from fastapi import APIRouter, Depends, HTTPException, status
from app.services.webscraper import Webscraper
from app.services.chatbot import ChatBot
from typing import List

router = APIRouter(prefix='/webscraper', tags=['webscraper'])
webscraper = Webscraper()
chatbot = ChatBot()

@router.get('/search/{query}')
async def search(query: str):
    relevant_results = []
    raw_data = webscraper.search(query)
    
    for url, article_text in raw_data.items():
        ai_response = chatbot.process_data(query, article_text)
        
        if "Текстът не съдържа информация" not in ai_response:
            relevant_results.append({
                "url": url,
                "text": ai_response
            })
            
    return relevant_results