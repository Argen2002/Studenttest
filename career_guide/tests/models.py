# models.py
from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Category(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name

class Question(models.Model):
    text = models.TextField()

    def __str__(self):
        return self.text

class Answer(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='answers')
    text = models.CharField(max_length=255)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='answers')

    def __str__(self):
        return self.text

    class Meta:
        unique_together = ('question', 'text')

class UserAnswer(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    answer = models.ForeignKey(Answer, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.user.username} - {self.question.text} - {self.answer.text}'



class Profession(models.Model):
    name = models.CharField(max_length=255)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='professions')

    def __str__(self):
        return self.name

class Subject(models.Model):
    name = models.CharField(max_length=255)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='subjects')

    def __str__(self):
        return self.name

class SubjectQuestion(models.Model):
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name='questions')
    text = models.TextField()

    def __str__(self):
        return self.text

class SubjectAnswer(models.Model):
    question = models.ForeignKey(SubjectQuestion, on_delete=models.CASCADE, related_name='answers')
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name='answers')  # Добавляем связь с Subject
    text = models.CharField(max_length=255)
    correct = models.BooleanField(default=False)
    points = models.IntegerField(default=0)

    def __str__(self):
        return self.text

    class Meta:
        unique_together = ('question', 'text')

class UserSubjectAnswer(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    question = models.ForeignKey(SubjectQuestion, on_delete=models.CASCADE)
    answer = models.ForeignKey(SubjectAnswer, on_delete=models.CASCADE)
    points = models.IntegerField(default=0)

    def __str__(self):
        return f'{self.user.username} - {self.question.text} - {self.answer.text}'


class University(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    rating = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    language_of_instruction = models.CharField(max_length=255)
    email = models.EmailField()
    contact_number = models.CharField(max_length=20)
    website = models.URLField()
    image = models.ImageField(upload_to='universities/', null=True, blank=True)
    professions = models.ManyToManyField(Profession, related_name='universities')

    def __str__(self):
        return self.name