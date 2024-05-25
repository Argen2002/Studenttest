# models.py
from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class Category(models.Model):
    name = models.CharField(max_length=255, verbose_name='Название категории')
    description = models.TextField(blank=True, null=True, verbose_name='Описание')

    def __str__(self):
        return self.name


class Question(models.Model):
    text = models.TextField(max_length=255, verbose_name='Вопрос')

    def __str__(self):
        return self.text


class Answer(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='answers', verbose_name='Вопрос')
    text = models.CharField(max_length=255, verbose_name='Ответ')
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='answers', verbose_name='Категория')

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
    name = models.CharField(max_length=255, verbose_name='Название профессий')
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='professions', verbose_name='Категория')

    def __str__(self):
        return self.name


class Subject(models.Model):
    name = models.CharField(max_length=255, verbose_name='Название предмета')
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='subjects', verbose_name='Категория')

    def __str__(self):
        return self.name


class SubjectQuestion(models.Model):
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name='questions', verbose_name='Предмет')
    text = models.TextField(max_length=255, verbose_name='Вопрос')

    def __str__(self):
        return self.text


class SubjectAnswer(models.Model):
    question = models.ForeignKey(SubjectQuestion, on_delete=models.CASCADE, related_name='answers', verbose_name='Вопрос')
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name='answers', verbose_name='Предмет')
    text = models.CharField(max_length=255, verbose_name='Ответ')
    correct = models.BooleanField(default=False, verbose_name='Статус')
    points = models.IntegerField(default=0, verbose_name='Баллы')

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
    name = models.CharField(max_length=255, verbose_name='Название')
    description = models.TextField(blank=True, null=True, verbose_name='Описание')
    rating = models.CharField(max_length=255, verbose_name='Рейтинг')
    address = models.CharField(max_length=255, verbose_name='Адрес')
    language_of_instruction = models.CharField(max_length=255, verbose_name='Языки')
    email = models.EmailField(max_length=125, verbose_name='Почта')
    contact_number = models.CharField(max_length=20, verbose_name='Контактный номер')
    website = models.URLField(max_length=255, verbose_name='Веб сайт')
    image = models.ImageField(upload_to='universities/', null=True, blank=True)
    professions = models.ManyToManyField(Profession, related_name='universities', verbose_name='Профессий')
    categories = models.ManyToManyField(Category, related_name='universities', verbose_name='Категории')

    contract = models.DecimalField(max_digits=10, decimal_places=2, verbose_name='Контракт')
    scholarship = models.CharField(max_length=255, verbose_name='Стипендия')
    budget = models.BooleanField(default=False, verbose_name='Бюджет')
    mission_and_goals = models.TextField(blank=True, null=True, verbose_name='Миссия и цели')
    threshold_ort = models.CharField(max_length=255, verbose_name='Пароговый балл орт')


    def __str__(self):
        return self.name


