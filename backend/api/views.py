from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.http import require_http_methods

from rest_framework.decorators import api_view

from services.webscraper.bulgarian import BulgarianWebscraper
from services.webscraper.math import MathWebscraper
from services.chatbot import ChatBot

@api_view(['GET'])
@require_http_methods(['GET'])
def scrape(request, category, query):
    if not query or not category:
        return JsonResponse({'error': 'No category or query provided'}, status=400)
    
    match category:
        case 'math':
            webscraper = MathWebscraper()
        case 'bulgarian':
            webscraper = BulgarianWebscraper()
        case _:
            return JsonResponse({'error': 'Invalid category'}, status=400)
        
    chatbot = ChatBot()
    
    raw_data = webscraper.search(query)
    
    relevant_results = []
    
    
    for url, article_text in raw_data.items():
        ai_response = chatbot.process_data(query, article_text)
        
        if "Текстът не съдържа информация" not in ai_response:
            relevant_results.append({
                "url": url,
                "text": ai_response
            })
            
    return JsonResponse({"results": relevant_results}, status=200)