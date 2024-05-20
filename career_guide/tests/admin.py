# tests/admin.py
from django.contrib import admin
from .models import Category, Question, Answer, UserAnswer

class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'description')
    search_fields = ('name',)
    ordering = ('name',)

class QuestionAdmin(admin.ModelAdmin):
    list_display = ('text', 'category')
    list_filter = ('category',)
    search_fields = ('text',)
    ordering = ('category', 'text')

class AnswerAdmin(admin.ModelAdmin):
    list_display = ('text', 'question', 'category')
    list_filter = ('question', 'category')
    search_fields = ('text',)
    ordering = ('question', 'text')

class UserAnswerAdmin(admin.ModelAdmin):
    list_display = ('user', 'question')
    list_filter = ('user', 'question')
    search_fields = ('user__username', 'question__text')
    ordering = ('user', 'question')

# Регистрируем модели
admin.site.register(Category, CategoryAdmin)
admin.site.register(Question, QuestionAdmin)
admin.site.register(Answer, AnswerAdmin)
admin.site.register(UserAnswer, UserAnswerAdmin)
