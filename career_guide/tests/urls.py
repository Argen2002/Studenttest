# tests/urls.py
from django.urls import path
from .views import CategoryListView, QuestionListView, AnswerListView, UserAnswerListView, TestResultView, \
    UniversityListView, UniversityDetailView, ProfessionListView, SubjectListView, SubjectQuestionListView, \
    SubjectAnswerListView, UserSubjectAnswerListView, SubjectTestResultView, UserProfileView

urlpatterns = [
    path('categories/', CategoryListView.as_view(), name='category-list'),

    path('questions/', QuestionListView.as_view(), name='question-list'),
    path('answers/', AnswerListView.as_view(), name='answer-list'),

    path('user-answers/', UserAnswerListView.as_view(), name='user-answer-list'),
    path('test-result/', TestResultView.as_view(), name='test-result'),

    path('universities/', UniversityListView.as_view(), name='university-list'),
    path('universities/<int:pk>/', UniversityDetailView.as_view(), name='university-detail'),

    path('professions/', ProfessionListView.as_view(), name='profession-list'),

    path('subjects/', SubjectListView.as_view(), name='subject-list'),
    path('subject-questions/<str:subject>/', SubjectQuestionListView.as_view(), name='subject-question-list'),
    path('subject-answers/', SubjectAnswerListView.as_view(), name='subject-answer-list'),
    path('user-subject-answers/', UserSubjectAnswerListView.as_view(), name='user-subject-answer-list'),
    path('subject-test-result/', SubjectTestResultView.as_view(), name='subject-test-result'),

    path('profile/', UserProfileView.as_view(), name='user-profile'),
]
