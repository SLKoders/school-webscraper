from django.contrib import admin

# Register your models here.
from .models import Question, Response, ResponseItem

# admin.site.register(Question)

@admin.register(Question)
class QuestionModelAdmin(admin.ModelAdmin):
    list_display = ('category', 'question', 'user', 'created_at')
    search_fields = ('question', 'category')
    list_filter = ('category',)
    
@admin.register(Response)
class ResponseModelAdmin(admin.ModelAdmin):
    list_display = ('question', 'created_at')
    
@admin.register(ResponseItem)
class ResponseItemModelAdmin(admin.ModelAdmin):
    list_display = ('response', 'url', 'text')