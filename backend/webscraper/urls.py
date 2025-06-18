from django.urls import path

from . import views

urlpatterns = [
    path('scrape/<str:category>/<str:query>', views.scrape, name='scrape'),
    path('get-questions/', views.get_questions, name="get-questions"),
    path('get-articles/<uuid:question_id>', views.get_articles_by_question, name="get-articles"),
]