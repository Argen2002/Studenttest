# Generated by Django 4.2 on 2024-05-21 10:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tests', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='University',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('description', models.TextField()),
                ('rating', models.DecimalField(decimal_places=2, max_digits=3)),
                ('address', models.CharField(max_length=255)),
                ('language_of_instruction', models.CharField(max_length=255)),
                ('email', models.EmailField(max_length=254)),
                ('contact_number', models.CharField(max_length=20)),
                ('website', models.URLField()),
            ],
        ),
    ]
