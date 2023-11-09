from rest_framework import serializers
from apps.users.models import *

class UsersCredentialSerializer(serializers.ModelSerializer):
    class Meta:
        model = UsersCredentials
        fields = (
            'user_id',
            'email',
            'password'
        )

class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = (
            'user',
            'firstname',
            'midname',
            'lastname',
            'occupation',
            'gender',
            'image',
            'phone',
            'about',
            'country'
        )