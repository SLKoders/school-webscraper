from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.http import require_http_methods
from rest_framework.response import Response
from rest_framework.decorators import api_view

from accounts.decorators import sign_in_required

from .services.webscraper.bulgarian import BulgarianWebscraper
# from backend.webscraper.services.webscraper.bulgarian import BulgarianWebscraper
from .services.webscraper.math import MathWebscraper
from .services.chatbot import ChatBot
from .models import Question, ResponseItem
from .models import Response as ResponseModel
from .serializers import QuestionSerializer

@api_view(['GET'])
@sign_in_required
def scrape(request, category, query):
    if not query or not category:
        return JsonResponse({'error': 'No category or query provided'}, status=400)
    
    match category:
        case 'math':
            webscraper = MathWebscraper()
        case 'bg':
            webscraper = BulgarianWebscraper()
        case _:
            return JsonResponse({'error': 'Invalid category'}, status=400)
        
    user = request.user
    question = Question.objects.create(
        question=query,
        category=category,
        user=user
    )
    
    question.save()
        
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
            
    response = ResponseModel(
        question=question
    )
    
    response.save()
    
    for result in relevant_results:
        response_item = ResponseItem(
            response=response,
            url=result["url"],
            text=result["text"],
        )
        response_item.save()
            
    return Response({"results": relevant_results}, status=200)


@api_view(['GET'])
@sign_in_required
def get_questions(request):
    user = request.user
    
    questions = Question.objects.filter(user=user)
    serializer = QuestionSerializer(questions, many=True)
    return Response(serializer.data, status=200)