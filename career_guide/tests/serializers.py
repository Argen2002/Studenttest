# tests/serializers.py
from rest_framework import serializers
from .models import Category, Question, Answer, UserAnswer, University, UserSubjectAnswer, SubjectAnswer, \
    SubjectQuestion, Subject, Profession


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
        fields = ['question', 'answer']

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


class UniversitySerializer(serializers.ModelSerializer):
    class Meta:
        model = University
        fields = '__all__'


class ProfessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profession
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
        fields = ['question', 'answer', 'points']

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