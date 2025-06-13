from fastapi import APIRouter, Depends, HTTPException, status
from app.services.webscraper import BulgarianWebscraper, MathWebscraper
from app.services.chatbot import ChatBot
from typing import List

router = APIRouter(prefix='/webscraper', tags=['webscraper'])
bulgarian_webscraper = BulgarianWebscraper()
math_webscraper = MathWebscraper()
chatbot = ChatBot()

@router.get('/search/{subject}/{query}')
async def search(subject: str, query: str):
    if subject == 'bulgarian':
        raw_data = bulgarian_webscraper.search(query)
    elif subject == 'math':
        raw_data = math_webscraper.search(query)
    else:
        return HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid subject")
    
    relevant_results = []
    
    
    for url, article_text in raw_data.items():
        ai_response = chatbot.process_data(query, article_text)
        
        if "Текстът не съдържа информация" not in ai_response:
            relevant_results.append({
                "url": url,
                "text": ai_response
            })
            
    return relevant_results