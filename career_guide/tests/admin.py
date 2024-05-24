# admin.py
from django.contrib import admin
from .models import Category, Question, Answer, UserAnswer, University, Profession, Subject, SubjectQuestion, SubjectAnswer, UserSubjectAnswer

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

class ProfessionAdmin(admin.ModelAdmin):
    list_display = ('name', 'category')
    search_fields = ('name', 'category__name')
    ordering = ('name',)

class SubjectAdmin(admin.ModelAdmin):
    list_display = ('name', 'category')
    search_fields = ('name', 'category__name')
    ordering = ('name',)

class SubjectQuestionAdmin(admin.ModelAdmin):
    list_display = ('text', 'subject')
    search_fields = ('text', 'subject__name')
    ordering = ('text',)

class SubjectAnswerAdmin(admin.ModelAdmin):
    list_display = ('text', 'question', 'subject', 'correct')
    list_filter = ('question', 'subject', 'correct')
    search_fields = ('text', 'question__text', 'subject__name')
    ordering = ('question', 'text')

class UserSubjectAnswerAdmin(admin.ModelAdmin):
    list_display = ('user', 'question', 'answer')
    list_filter = ('user', 'question', 'answer')
    search_fields = ('user__username', 'question__text', 'answer__text')
    ordering = ('user', 'question')

admin.site.register(Category, CategoryAdmin)
admin.site.register(Question, QuestionAdmin)
admin.site.register(Answer, AnswerAdmin)
admin.site.register(UserAnswer, UserAnswerAdmin)
admin.site.register(University, UniversityAdmin)
admin.site.register(Profession, ProfessionAdmin)
admin.site.register(Subject, SubjectAdmin)
admin.site.register(SubjectQuestion, SubjectQuestionAdmin)
admin.site.register(SubjectAnswer, SubjectAnswerAdmin)
admin.site.register(UserSubjectAnswer, UserSubjectAnswerAdmin)
