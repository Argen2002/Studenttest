# permissions.py

from rest_framework.permissions import BasePermission

class IsOwnerOrReadOnly(BasePermission):
    def has_object_permission(self, request, view, obj):
        # Разрешить чтение для всех запросов
        if request.method in ('GET', 'HEAD', 'OPTIONS'):
            return True

        # Разрешить редактирование только владельцу объекта
        return obj.added_by == request.user
