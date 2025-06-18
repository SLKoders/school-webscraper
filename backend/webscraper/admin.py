from django.contrib import admin

# Register your models here.
from .models import Question, Response, ResponseItem

# admin.site.register(Question)

# @admin.register(Question)
# class QuestionModelAdmin(admin.ModelAdmin):
#     list_display = ('category', 'question', 'user', 'created_at')
#     search_fields = ('question', 'category')
#     list_filter = ('category',)
    
# @admin.register(Response)
# class ResponseModelAdmin(admin.ModelAdmin):
#     list_display = ('question', 'created_at')
    
# @admin.register(ResponseItem)
# class ResponseItemModelAdmin(admin.ModelAdmin):
#     list_display = ('response', 'url', 'text')

class ResponseItemInline(admin.StackedInline):  # or admin.StackedInline
    model = ResponseItem
    extra = 1  # Number of empty forms to display

class ResponseInline(admin.StackedInline):
    model = Response
    extra = 1
    show_change_link = True  # Allows clicking through to edit the Response
    inlines = [ResponseItemInline]  # Nested inlines (Django 3.0+)

@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    inlines = [ResponseInline]
    list_display = ('question', 'category', 'user', 'created_at')
    search_fields = ('question', 'category')
    list_filter = ('category', 'created_at')

@admin.register(Response)
class ResponseAdmin(admin.ModelAdmin):
    inlines = [ResponseItemInline]
    list_display = ('question', 'created_at')
    search_fields = ('question__question',)