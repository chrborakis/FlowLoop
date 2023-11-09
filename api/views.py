from django.views import View
from django.shortcuts import render
from rest_framework import generics
from .serializers import *
from apps.users.models import *

class UsersCredentialView(generics.CreateAPIView):
    queryset = UsersCredentials.objects.all()
    serializer_class = UsersCredentialSerializer

class UsersView(generics.CreateAPIView):
    queryset = Users.objects.all()
    serializer_class = UsersSerializer