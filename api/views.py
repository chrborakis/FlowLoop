import json
from django.http import HttpResponse, JsonResponse
from django.views import View
from django.shortcuts import render
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import *
from apps.users.models import *
from rest_framework import viewsets
from django.views.generic import ListView
from django.views.decorators.csrf import csrf_exempt

class UsersView(APIView):
    def get( self, request):
        output = [{
            "user": str(output.user),
            "firstname": output.firstname,
            "midname": output.midname if output.midname is not None else '',
            "lastname": output.lastname,
            "occupation": output.occupation,
            "gender": output.gender,
            "image": str(output.image.url) if output.image else '',
            "phone": str(output.phone),
            "about": output.about,
            "country": output.country,
            }for output in Users.objects.all()
        ]
        return Response(output)
    
    def post( self, request):
        serializer = UsersSerializer(data = request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
    
    
class UsersCredentialView(APIView):
    def get( self, request):
        output = [{
            "email": output.email,
            "password": output.password
            }for output in UsersCredentials.objects.all()
        ]
        return Response(output)
    
    def post( self, request):
        serializers = UsersCredentialSerializer(data = request.data)
        if serializers.is_valid(raise_exception=True):
            serializers.save()
            return Response(serializers.data)


