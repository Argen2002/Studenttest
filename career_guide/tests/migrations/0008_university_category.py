# Generated by Django 5.0.6 on 2024-05-24 14:43

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tests', '0007_remove_university_categories'),
    ]

    operations = [
        migrations.AddField(
            model_name='university',
            name='category',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='universities', to='tests.category'),
            preserve_default=False,
        ),
    ]
