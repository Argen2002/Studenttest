# tests/views.py
from rest_framework import generics
from .models import Category, Question, Answer, UserAnswer, University, Profession, Subject, SubjectQuestion, SubjectAnswer, UserSubjectAnswer
from .serializers import CategorySerializer, QuestionSerializer, AnswerSerializer, UserAnswerSerializer, \
    ProfessionSerializer, SubjectSerializer, SubjectQuestionSerializer, SubjectAnswerSerializer, \
    UserSubjectAnswerSerializer, UserProfileSerializer, UniversityCreateSerializer, UserSerializer, \
    UniversityReadSerializer, UniversityWriteSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny, BasePermission
from django.db.models import Q
from django.core.mail import EmailMessage
from rest_framework import status
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from .permissions import IsOwnerOrReadOnly


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
        categories = Category.objects.all()
        category_count = {category.name: 0 for category in categories}
        category_descriptions = {category.name: category.description for category in categories}

        professions = {}
        for category in categories:
            professions[category.name] = [profession.name for profession in category.professions.all()]

        subjects = {}
        for category in categories:
            subjects[category.name] = [subject.name for subject in category.subjects.all()]

        for user_answer in user_answers:
            category_count[user_answer.answer.category.name] += 1

        total_answers = len(user_answers)
        result = {category: round((count / total_answers) * 100, 2) for category, count in category_count.items()}

        top_category = max(result, key=result.get)
        recommended_universities = University.objects.filter(categories__name=top_category)

        university_serializer = UniversityWriteSerializer(recommended_universities, many=True)

        result_with_descriptions = {
            "results": result,
            "descriptions": category_descriptions,
            "professions": professions,
            "subjects": subjects,
            "universities": university_serializer.data
        }

        return Response(result_with_descriptions)


class UniversityListView(generics.ListCreateAPIView):
    queryset = University.objects.all()
    serializer_class = UniversityWriteSerializer
    permission_classes = [AllowAny]

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
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]

    def get_serializer_class(self):
        if self.request.method in ['GET']:
            return UniversityReadSerializer
        return UniversityWriteSerializer

    def perform_update(self, serializer):
        serializer.save(added_by=self.request.user)


class CanAddUniversityPermission(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and request.user.can_add_university


class CreateUniversityView(generics.CreateAPIView):
    queryset = University.objects.all()
    serializer_class = UniversityCreateSerializer
    permission_classes = [IsAuthenticated, CanAddUniversityPermission]

    def perform_create(self, serializer):
        serializer.save(added_by=self.request.user)


class ProfessionListView(generics.ListCreateAPIView):
    queryset = Profession.objects.all()
    serializer_class = ProfessionSerializer


class ProfessionDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Profession.objects.all()
    serializer_class = ProfessionSerializer


class SubjectListView(generics.ListCreateAPIView):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer


class SubjectQuestionListView(generics.ListAPIView):
    serializer_class = SubjectQuestionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        subject = self.kwargs['subject']
        return SubjectQuestion.objects.filter(subject__name=subject)


class SubjectAnswerListView(generics.ListCreateAPIView):
    queryset = SubjectAnswer.objects.all()
    serializer_class = SubjectAnswerSerializer


class UserSubjectAnswerListView(generics.CreateAPIView):
    queryset = UserSubjectAnswer.objects.all()
    serializer_class = UserSubjectAnswerSerializer
    permission_classes = [IsAuthenticated]

    def get_serializer(self, *args, **kwargs):
        if isinstance(kwargs.get('data', {}), list):
            kwargs['many'] = True
        return super(UserSubjectAnswerListView, self).get_serializer(*args, **kwargs)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class SubjectTestResultView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user_subject_answers = UserSubjectAnswer.objects.filter(user=request.user)
        subject_points = {}

        for answer in user_subject_answers:
            subject_name = answer.question.subject.name
            if subject_name not in subject_points:
                subject_points[subject_name] = 0
            subject_points[subject_name] += answer.points

        return Response({"subject_points": subject_points})


class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user
        serializer = UserProfileSerializer(user)
        return Response(serializer.data)

class ContactFormView(APIView):
    def post(self, request, *args, **kwargs):
        name = request.data.get('name')
        email = request.data.get('email')
        message = request.data.get('message')
        files = request.FILES.getlist('files')

        email_subject = f"Message from {name}"
        email_body = f"Имя: {name}\nEmail: {email}\n\n{message}"

        email_message = EmailMessage(
            subject=email_subject,
            body=email_body,
            from_email=f"{name} <{settings.EMAIL_HOST_USER}>",
            to=[settings.EMAIL_HOST_USER],
            reply_to=[email]
        )

        for file in files:
            email_message.attach(file.name, file.read(), file.content_type)

        email_message.send()

        return Response({"message": "Email sent successfully"}, status=status.HTTP_200_OK)


class CurrentUserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)


class UserDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)