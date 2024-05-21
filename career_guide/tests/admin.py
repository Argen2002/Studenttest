# tests/admin.py
from django.contrib import admin
from .models import Category, Question, Answer, UserAnswer, University

class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'description')
    search_fields = ('name',)
    ordering = ('name',)

class QuestionAdmin(admin.ModelAdmin):
    list_display = ('text',)
    search_fields = ('text',)
    ordering = ('text',)

class AnswerAdmin(admin.ModelAdmin):
    list_display = ('text', 'question', 'category')
    list_filter = ('question', 'category')
    search_fields = ('text',)
    ordering = ('question', 'text')

class UserAnswerAdmin(admin.ModelAdmin):
    list_display = ('user', 'question', 'answer')
    list_filter = ('user', 'question', 'answer')
    search_fields = ('user__username', 'question__text', 'answer__text')
    ordering = ('user', 'question')

class UniversityAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'rating', 'address', 'language_of_instruction', 'email', 'contact_number', 'website')
    search_fields = ('name', 'address', 'email')
    ordering = ('name',)

admin.site.register(Category, CategoryAdmin)
admin.site.register(Question, QuestionAdmin)
admin.site.register(Answer, AnswerAdmin)
admin.site.register(UserAnswer, UserAnswerAdmin)
admin.site.register(University, UniversityAdmin)
