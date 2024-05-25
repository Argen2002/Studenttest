# Generated by Django 5.0.6 on 2024-05-25 15:28

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tests', '0013_university_budget_university_contract_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='answer',
            name='category',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='answers', to='tests.category', verbose_name='Категория'),
        ),
        migrations.AlterField(
            model_name='answer',
            name='question',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='answers', to='tests.question', verbose_name='Вопрос'),
        ),
        migrations.AlterField(
            model_name='answer',
            name='text',
            field=models.CharField(max_length=255, verbose_name='Ответ'),
        ),
        migrations.AlterField(
            model_name='category',
            name='description',
            field=models.TextField(blank=True, null=True, verbose_name='Описание'),
        ),
        migrations.AlterField(
            model_name='category',
            name='name',
            field=models.CharField(max_length=255, verbose_name='Название категории'),
        ),
        migrations.AlterField(
            model_name='profession',
            name='category',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='professions', to='tests.category', verbose_name='Категория'),
        ),
        migrations.AlterField(
            model_name='profession',
            name='name',
            field=models.CharField(max_length=255, verbose_name='Название профессий'),
        ),
        migrations.AlterField(
            model_name='question',
            name='text',
            field=models.TextField(max_length=255, verbose_name='Вопрос'),
        ),
        migrations.AlterField(
            model_name='subject',
            name='category',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='subjects', to='tests.category', verbose_name='Категория'),
        ),
        migrations.AlterField(
            model_name='subject',
            name='name',
            field=models.CharField(max_length=255, verbose_name='Название предмета'),
        ),
        migrations.AlterField(
            model_name='subjectanswer',
            name='correct',
            field=models.BooleanField(default=False, verbose_name='Статус'),
        ),
        migrations.AlterField(
            model_name='subjectanswer',
            name='points',
            field=models.IntegerField(default=0, verbose_name='Баллы'),
        ),
        migrations.AlterField(
            model_name='subjectanswer',
            name='question',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='answers', to='tests.subjectquestion', verbose_name='Вопрос'),
        ),
        migrations.AlterField(
            model_name='subjectanswer',
            name='subject',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='answers', to='tests.subject', verbose_name='Предмет'),
        ),
        migrations.AlterField(
            model_name='subjectanswer',
            name='text',
            field=models.CharField(max_length=255, verbose_name='Ответ'),
        ),
        migrations.AlterField(
            model_name='subjectquestion',
            name='subject',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='questions', to='tests.subject', verbose_name='Предмет'),
        ),
        migrations.AlterField(
            model_name='subjectquestion',
            name='text',
            field=models.TextField(max_length=255, verbose_name='Вопрос'),
        ),
        migrations.AlterField(
            model_name='university',
            name='address',
            field=models.CharField(max_length=255, verbose_name='Адрес'),
        ),
        migrations.AlterField(
            model_name='university',
            name='budget',
            field=models.BooleanField(default=False, verbose_name='Бюджет'),
        ),
        migrations.AlterField(
            model_name='university',
            name='categories',
            field=models.ManyToManyField(related_name='universities', to='tests.category', verbose_name='Категории'),
        ),
        migrations.AlterField(
            model_name='university',
            name='contact_number',
            field=models.CharField(max_length=20, verbose_name='Контактный номер'),
        ),
        migrations.AlterField(
            model_name='university',
            name='contract',
            field=models.DecimalField(decimal_places=2, max_digits=10, verbose_name='Контракт'),
        ),
        migrations.AlterField(
            model_name='university',
            name='description',
            field=models.TextField(max_length=255, verbose_name='Описание'),
        ),
        migrations.AlterField(
            model_name='university',
            name='email',
            field=models.EmailField(max_length=125, verbose_name='Почта'),
        ),
        migrations.AlterField(
            model_name='university',
            name='language_of_instruction',
            field=models.CharField(max_length=255, verbose_name='Языки'),
        ),
        migrations.AlterField(
            model_name='university',
            name='mission_and_goals',
            field=models.TextField(verbose_name='Миссия и цели'),
        ),
        migrations.AlterField(
            model_name='university',
            name='name',
            field=models.CharField(max_length=255, verbose_name='Название'),
        ),
        migrations.AlterField(
            model_name='university',
            name='professions',
            field=models.ManyToManyField(related_name='universities', to='tests.profession', verbose_name='Профессий'),
        ),
        migrations.AlterField(
            model_name='university',
            name='rating',
            field=models.CharField(max_length=255, verbose_name='Рейтинг'),
        ),
        migrations.AlterField(
            model_name='university',
            name='scholarship',
            field=models.CharField(max_length=255, verbose_name='Стипендия'),
        ),
        migrations.AlterField(
            model_name='university',
            name='threshold_ort',
            field=models.CharField(max_length=255, verbose_name='Пароговый балл орт'),
        ),
        migrations.AlterField(
            model_name='university',
            name='website',
            field=models.URLField(max_length=255, verbose_name='Веб сайт'),
        ),
    ]
