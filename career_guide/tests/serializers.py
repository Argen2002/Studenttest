# tests/serializers.py
from rest_framework import serializers
from .models import Category, Question, Answer, UserAnswer, University, UserSubjectAnswer, SubjectAnswer, \
    SubjectQuestion, Subject, Profession, User


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ['id', 'question', 'text', 'category']


class QuestionSerializer(serializers.ModelSerializer):
    answers = AnswerSerializer(many=True, read_only=True)

    class Meta:
        model = Question
        fields = '__all__'


class UserAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAnswer
        fields = ['question', 'answer', 'id']

    def create(self, validated_data):
        user = self.context['request'].user
        validated_data['user'] = user
        return super().create(validated_data)


class UserAnswerListSerializer(serializers.ListSerializer):
    child = UserAnswerSerializer()

    def create(self, validated_data):
        user = self.context['request'].user
        answers = [UserAnswer(user=user, **item) for item in validated_data]
        return UserAnswer.objects.bulk_create(answers)


class ProfessionSerializer(serializers.ModelSerializer):
    category = serializers.StringRelatedField()
    class Meta:
        model = Profession
        fields = '__all__'


class UniversityCreateSerializer(serializers.ModelSerializer):
    categories = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all(), many=True)
    professions = serializers.PrimaryKeyRelatedField(queryset=Profession.objects.all(), many=True)
    added_by = serializers.ReadOnlyField(source='added_by.username')

    class Meta:
        model = University
        fields = '__all__'


class UniversityReadSerializer(serializers.ModelSerializer):
    categories = CategorySerializer(many=True)
    professions = ProfessionSerializer(many=True)
    added_by = serializers.ReadOnlyField(source='added_by.username')

    class Meta:
        model = University
        fields = '__all__'

class UniversityWriteSerializer(serializers.ModelSerializer):
    categories = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all(), many=True)
    professions = serializers.PrimaryKeyRelatedField(queryset=Profession.objects.all(), many=True)
    added_by = serializers.ReadOnlyField(source='added_by.username')

    class Meta:
        model = University
        fields = '__all__'



class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = '__all__'


class SubjectAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubjectAnswer
        fields = '__all__'


class SubjectQuestionSerializer(serializers.ModelSerializer):
    answers = SubjectAnswerSerializer(many=True, read_only=True)

    class Meta:
        model = SubjectQuestion
        fields = '__all__'


class UserSubjectAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserSubjectAnswer
        fields = ['question', 'answer', 'points', 'id']

    def create(self, validated_data):
        user = self.context['request'].user
        validated_data['user'] = user
        validated_data['points'] = validated_data['answer'].points if validated_data['answer'].correct else 0
        return super().create(validated_data)


class UserSubjectAnswerListSerializer(serializers.ListSerializer):
    child = UserSubjectAnswerSerializer()

    def create(self, validated_data):
        user = self.context['request'].user
        answers = [UserSubjectAnswer(user=user, **item) for item in validated_data]
        return UserSubjectAnswer.objects.bulk_create(answers)


class UserProfileSerializer(serializers.ModelSerializer):
    last_three_results = serializers.SerializerMethodField()
    personality_type = serializers.SerializerMethodField()
    subject_tests = serializers.SerializerMethodField()
    subject_points = serializers.SerializerMethodField()
    recommended_universities = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['username', 'last_three_results', 'personality_type', 'subject_tests', 'subject_points', 'recommended_universities']

    def get_last_three_results(self, obj):
        user_answers = UserAnswer.objects.filter(user=obj).order_by('-id')[:3]
        return [{"question": answer.question.text, "answer": answer.answer.text, "category": answer.answer.category.name} for answer in user_answers]

    def get_personality_type(self, obj):
        user_answers = UserAnswer.objects.filter(user=obj)
        category_count = {category.name: 0 for category in Category.objects.all()}
        for user_answer in user_answers:
            category_count[user_answer.answer.category.name] += 1
        total_answers = len(user_answers)
        result = {category: round((count / total_answers) * 100, 2) for category, count in category_count.items()}
        top_category = max(result, key=result.get)
        return top_category

    def get_subject_tests(self, obj):
        user_subject_answers = UserSubjectAnswer.objects.filter(user=obj)
        subjects = {answer.question.subject.name for answer in user_subject_answers}
        return list(subjects)

    def get_subject_points(self, obj):
        user_subject_answers = UserSubjectAnswer.objects.filter(user=obj)
        subject_points = {}
        for answer in user_subject_answers:
            subject_name = answer.question.subject.name
            if subject_name not in subject_points:
                subject_points[subject_name] = 0
            subject_points[subject_name] += answer.points
        return subject_points

    def get_recommended_universities(self, obj):
        personality_type = self.get_personality_type(obj)
        universities = University.objects.filter(categories__name=personality_type)
        return UniversityWriteSerializer(universities, many=True).data


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'can_add_university')