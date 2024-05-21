# tests/urls.py
from django.urls import path
from .views import CategoryListView, QuestionListView, AnswerListView, UserAnswerListView, TestResultView, \
    UniversityListView, UniversityDetailView


urlpatterns = [
    path('categories/', CategoryListView.as_view(), name='category-list'),
    path('questions/', QuestionListView.as_view(), name='question-list'),
    path('answers/', AnswerListView.as_view(), name='answer-list'),
    path('user-answers/', UserAnswerListView.as_view(), name='user-answer-list'),
    path('test-result/', TestResultView.as_view(), name='test-result'),

    path('universities/', UniversityListView.as_view(), name='university-list'),
    path('universities/<int:pk>/', UniversityDetailView.as_view(), name='university-detail'),
]
