# users/models.py
from django.contrib.auth.models import AbstractUser
from django.db import models


class CustomUser(AbstractUser):
    can_add_university = models.BooleanField(default=False, verbose_name='Может добавлять университеты')

    def __str__(self):
        return self.username
