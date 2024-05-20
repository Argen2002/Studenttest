# tests/views.py
from rest_framework import generics
from rest_framework.views import APIView

from .models import Category, Question, Answer, UserAnswer
from .serializers import CategorySerializer, QuestionSerializer, AnswerSerializer, UserAnswerSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny


class CategoryListView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class QuestionListView(generics.ListCreateAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

class AnswerListView(generics.ListCreateAPIView):
    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer

class UserAnswerListView(generics.ListCreateAPIView):
    queryset = UserAnswer.objects.all()
    serializer_class = UserAnswerSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class TestResultView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        user_answers = UserAnswer.objects.filter(user=request.user)
        category_count = {category.name: 0 for category in Category.objects.all()}

        for user_answer in user_answers:
            category_count[user_answer.answer.category.name] += 1

        total_answers = len(user_answers)
        result = {category: (count / total_answers) * 100 for category, count in category_count.items()}

        return Response(result)
