from django.urls import path

from . import views

urlpatterns = [
    path('scrape/<str:category>/<str:query>', views.scrape, name='scrape'),
]