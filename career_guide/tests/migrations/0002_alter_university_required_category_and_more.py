# Generated by Django 5.0.6 on 2024-05-23 17:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tests', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='university',
            name='required_category',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='university',
            name='required_subject',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
