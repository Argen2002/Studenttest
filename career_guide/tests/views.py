# tests/views.py
from rest_framework import generics
from .models import Category, Question, Answer, UserAnswer, University
from .serializers import CategorySerializer, QuestionSerializer, AnswerSerializer, UserAnswerSerializer, \
    UniversitySerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.db.models import Q


class CategoryListView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class QuestionListView(generics.ListCreateAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer


class AnswerListView(generics.ListCreateAPIView):
    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer


class UserAnswerListView(generics.CreateAPIView):
    queryset = UserAnswer.objects.all()
    serializer_class = UserAnswerSerializer
    permission_classes = [IsAuthenticated]

    def get_serializer(self, *args, **kwargs):
        if isinstance(kwargs.get('data', {}), list):
            kwargs['many'] = True
        return super(UserAnswerListView, self).get_serializer(*args, **kwargs)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class TestResultView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user_answers = UserAnswer.objects.filter(user=request.user)
        category_count = {category.name: 0 for category in Category.objects.all()}
        category_descriptions = {category.name: category.description for category in Category.objects.all()}

        for user_answer in user_answers:
            category_count[user_answer.answer.category.name] += 1

        total_answers = len(user_answers)
        result = {category: round((count / total_answers) * 100, 2) for category, count in category_count.items()}
        result_with_descriptions = {
            "results": result,
            "descriptions": category_descriptions
        }

        return Response(result_with_descriptions)


class UniversityListView(generics.ListCreateAPIView):
    queryset = University.objects.all()
    serializer_class = UniversitySerializer
    permission_classes = [AllowAny]  # Разрешаем доступ всем

    def get_queryset(self):
        queryset = super().get_queryset()
        search = self.request.query_params.get('search', None)
        if search:
            queryset = queryset.filter(
                Q(name__icontains=search) |
                Q(description__icontains=search) |
                Q(address__icontains=search)
            )
        return queryset


class UniversityDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = University.objects.all()
    serializer_class = UniversitySerializer
    permission_classes = [AllowAny]  # Разрешаем доступ всем