import json
from django.http import HttpResponse, JsonResponse
from django.views import View
from django.shortcuts import get_list_or_404, render
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
            "user_id": str(output.user),
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
            return Response(data=serializer.data, status=status.HTTP_200_OK)
    
class UserView(APIView):
    def get(self, request, pk):
        user = get_object_or_404(Users, user_id=pk)
        serializer = UsersSerializer(user)
        return Response(data=serializer.data, status=status.HTTP_200_OK)


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
            return Response(data=serializers.data, status=status.HTTP_200_OK)
        
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
        

class CompanyView(APIView):    
    def get( self, request, pk):
        instance = get_object_or_404(Companies, slug=pk)
        serializers = CompaniesSerializer(instance)
        # print(serializers.data)
        return Response(serializers.data)

    def post( self, request, company):
        serializer = PostsPrivateSerializer( data = request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)


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
        print(request.data)
        serializer = WorkRequestsSerializer(data = request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)

class GetWorkRequestView(APIView):
    def get( self, request, user):
        instance = get_object_or_404(WorkRequests, user=user)
        serializers = WorkRequestsSerializer(instance)
        # print(serializers.data)
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
        
class PostsPublicView(APIView):
    def get( self, request):
        instances = get_list_or_404(PostsPublic.objects.order_by('-publish_date'))
        serializers = PostsPublicSerializer(instances, many=True)        
        return Response(serializers.data)

    def post( self, request):
        print(request.data)
        serializers = PostsPublicSerializer( data = request.data)
        if serializers.is_valid(raise_exception=True):
            saved_instance = serializers.save()
            serialized_data = PostsPublicSerializer(saved_instance).data
            return JsonResponse(data=serialized_data, status=201)

class AllPostsPrivateView(APIView):
    def get( self, request):
        instances = get_list_or_404(PostsPrivate.objects.order_by('-publish_date'))
        serializers = PostsPrivateSerializer(instances, many=True)        
        return Response(serializers.data)

    def post( self, request):
        serializers = PostsPrivateSerializer( data = request.data)
        if serializers.is_valid(raise_exception=True):
            serializers.save()
            return Response(serializers.data)

class PostsPrivateView(APIView):    
    def get( self, request, company):
        instances = PostsPrivate.objects.filter(author__employee__company = company)
        serializers = PostsPrivateSerializer(instances, many=True)
        return Response(serializers.data)

    def post( self, request, company):
        serializers = PostsPrivateSerializer( data = request.data)
        if serializers.is_valid(raise_exception=True):
            serializers.save()
            return Response(serializers.data)

class PostPublicCommentView(APIView):
    def get( self, request):
        output = [{
            'post': str(output.post),
            'commentor': str(output.commentor),
            'comment': str(output.comment),
            'date': str(output.date),
        }for output in PostsPublicComments.objects.all()
    ]
        return Response(output)
    
    def post( self, request):
        print("data : ", request.data)
        serializers = PostsPublicCommentsSerializer( data = request.data)
        if serializers.is_valid(raise_exception=True):
            serializers.save()
            return Response(serializers.data)
        
class PostPrivateCommentView(APIView):
    def get( self,request):
        output = [{
            'post': str(output.post),
            'commentor': str(output.commentor),
            'comment': str(output.comment),
            'date': str(output.date),
        }for output in PostsPrivateComments.objects.all()
    ]
        return Response(output)
    
    def post( self, request):
        print("data : ", request.data)
        serializers = PostsPrivateCommentsSerializer( data = request.data)
        if serializers.is_valid(raise_exception=True):
            serializers.save()
            return Response(serializers.data)
        
class PublicLikesView(APIView):
    def get( self, request):
        output = [{
            "id": output.id,
            "post_id": output.post_id,
            "like_id": output.like_id,
        }for output in PostsPublicLikes.objects.all()
    ]
        print(output)
        return Response(output)
    
    def post( self, request):
        print("data : ", request.data)
        serializers = PublicLikesSerializer( data = request.data)
        if serializers.is_valid(raise_exception=True):
            serializers.save()
            return Response(serializers.data)
        else:
            print(serializers.errors)
        
class PrivateLikesView(APIView):
    def get( self, request):
        output = [{
            'id': output.id,
            'post_id': output.post_id,
            'like_id': output.like_id,
        }for output in PostsPrivateLikes.objects.all()
    ]
        print(output)
        return Response(output)
    
    def post( self, request):
        print("data : ", request.data)
        serializers = PrivateLikesSerializer( data = request.data)
        if serializers.is_valid(raise_exception=True):
            serializers.save()
            return Response(serializers.data)