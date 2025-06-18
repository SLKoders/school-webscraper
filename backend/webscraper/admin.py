from django.contrib import admin

from .models import Question, Article

class ArticleInline(admin.StackedInline):
    model = Article
    extra = 0

@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    inlines = [ArticleInline]
    ordering = ['-created_at']
    list_display = ('question', 'category', 'user', 'created_at')
    search_fields = ('question', 'category')
    list_filter = ('category', 'created_at')