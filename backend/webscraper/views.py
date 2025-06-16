from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods

from webscraper.services.bulgarian import BulgarianWebscraper

# from .services.webscraper.bulgarian import BulgarianWebscraper

# Create your views here.
@require_http_methods(['GET'])
def search(request):
    query = request.GET.get('q')
    
    if not query:
        return JsonResponse({'error': 'No query provided'}, status=400)
    
    webscraper = BulgarianWebscraper()
    data = webscraper.search(query)
    return JsonResponse(data)