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
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import action
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
        
class CompaniesView(APIView):
    def get( self, request):
        try:
            output = [{
                "company_id": output.company_id,
                "company_name": output.company_name,
                "slug": output.slug,
                "description": output.description,
                "image": str(output.image.url) if output.image else '',
                "establishment_date": output.establishment_date,
                "creation_date": output.creation_date,
                "address": str(output.address),
                "phone": str(output.phone)
                }for output in Companies.objects.all()
            ]
            return Response(output)
        except UnicodeDecodeError:
            return Response({"error": "UnicodeDecodeError occurred while processing data"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


    def post( self, request):
        serializers = CompaniesSerializer(data = request.data)
        if serializers.is_valid(raise_exception=True):
            serializers.save()
            return Response(serializers.data)
        
class WorkRequestsView(APIView):
    def get( self, request):
        output = [{
            'id': output.id,
            'user': {
                'id':   output.user.user_id,
                'name': str(output.user)
            },
            'company': {
                'id':   output.company.company_id,
                'name': output.company.company_name,
            },
            'status': output.status
            }for output in WorkRequests.objects.all()
        ]
        return Response(output)
    
    def post( self, request):
        serializers = WorkRequestsSerializer(data = request.data)
        if serializers.is_valid(raise_exception=True):
            serializers.save()
            return Response(serializers.data)

class WorksOnView(APIView):
    def get( self, request):
        output = [{
            'id': output.id,
            'employee': {
                'user': {
                    'id':   output.employee.user_id,
                    'name': str(output.employee.user)
                },
                'company': {
                    'id':   output.employee.company.company_id,
                    'name': output.employee.company.company_name,
                },
            },
            'is_admin': output.is_admin
        }for output in WorksOn.objects.all()]
        return Response(output)
    
    def post( self, request):
        serializers = WorksOnSerializer(data = request.data)
        if serializers.is_valid(raise_exception=True):
            serializers.save()
            return Response(serializers.data)


class PostsPrivateView(APIView):
    def get( self, request):
        try:
            output = [{
                'post': output.post_id,
                'slug': output.slug,
                'author': {
                    'user': {
                        'id':   output.author.employee.user.user_id,
                        'name': str(output.author.employee.user)
                    },
                    'company': {
                        'id':   output.author.employee.company.company_id,
                        'name': output.author.employee.company.company_name,
                    },
                },
                'title': output.title,
                'body': output.body,
                'publish_date': output.publish_date,
                "image": str(output.image.url) if output.image else '',
            }for output in PostsPrivate.objects.all()]
            return Response(output)
    
        except UnicodeDecodeError:
            return Response({"error": "UnicodeDecodeError occurred while processing data"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def post( self, request):
        serializers = PostsPrivateSerializer( data = request.data)
        if serializers.is_valid(raise_exception=True):
            serializers.save()
            return Response(serializers.data)

class PostsPublicView(APIView):
    def get( self, request):
        output = [{
            'post': output.post_id,
            'slug': output.slug,
            'author': {
                'id':   output.author.user_id,
                'name': str(output.author)
            },
            'title': output.title,
            'body': output.body,
            'publish_date': output.publish_date,
            "image": str(output.image.url) if output.image else '',
            }for output in PostsPublic.objects.all()
        ]
        return Response(output)

    def post( self, request):
        serializers = PostsPublicSerializer( data = request.data)
        if serializers.is_valid(raise_exception=True):
            serializers.save()
            return Response(serializers.data)




@action(detail=True, methods=['post'])
class UserProfile(APIView):
    def get(self,request,slug,*args,**kwargs):
        try:
            instance = get_object_or_404(Users, slug=slug)
            serializers = UsersSerializer(instance)
            return JsonResponse({
                'message': 'User Data Fetched succesfully',
                'data': serializers.data,
                'status': status.HTTP_200_OK
            })
        except Exception as e:
            return JsonResponse({
                'message': e
            })
        