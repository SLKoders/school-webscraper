from rest_framework import serializers
from .models import Article, Question

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ('id', 'category', 'question', 'created_at')
        
class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ('id', 'url', 'text', 'created_at')