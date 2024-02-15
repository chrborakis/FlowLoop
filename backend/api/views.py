import json
from django.http import Http404, HttpResponse, JsonResponse
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

from rest_framework.views import APIView
from rest_framework.response import Response

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
    def get( self, request, company):
        instances = get_list_or_404(WorkRequests.objects.filter( company=company, status="P"))
        serializers = WorkRequestsSerializer(instances, many=True)        
        return Response(serializers.data)
    
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
        return Response(serializers.data)
    
    def post( self, request, user):
        print("DATA IN API -> ", request.data)
        serializer = WorkRequestsSerializer(data = request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)


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
        
class FriendRequestList(APIView):
    def get( self, request, id):
        try:
            instances = get_list_or_404(FriendRequests.objects.filter( request=id, status="P"))
            serializers = FriendsRequestsSerializer(instances, many=True)        
            return Response(serializers.data)
        except Http404:
            return Response({'error': 'FriendRequests instances not found.'}, status=404)    
    def post( self, request):
        serializer = FriendsRequestsSerializer(data = request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
        
class FriendRequest(APIView):
    def get( self, request):
        user1 = request.data.get("user1")
        reque = request.data.get("request")
        try:
            # request.query_params
            instance = get_object_or_404(FriendRequests, user1=user1, request=reque)
            serializers = FriendsRequestsSerializer(instance)
            return Response(serializers.data)
        except Http404:
            return Response({'error': 'FriendRequests instance not found.'}, status=404)    
        
class AllFriendsRequestsView(APIView):
    def get( self, request):
        instances = get_list_or_404( FriendRequests)
        serializers = FriendsRequestsSerializer(instances, many=True)        
        return Response(serializers.data)
    def post( self, request):
        pass
        
class FriendsView(APIView):
    def get( self, request, user, friend):
        instance = get_object_or_404(Friends, user1=user, friend=friend)
        serializers = FriendsSerializer(instance)
        return Response(serializers.data)
    
    def post( self, request, user):
        print("DATA IN API -> ", request.data)
        serializer = FriendsSerializer(data = request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)

class AllFriendsView(APIView):
    def get( self, request):
        instances = get_list_or_404(Friends)
        serializers = FriendsSerializer(instances, many=True)        
        return Response(serializers.data)
    def post( self, request):
        pass

class AllPostsPublicView(APIView):
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
        
class PostsPublicView(APIView):    
    def get( self, request, user):
        instances = get_list_or_404(PostsPublic.objects.filter( author__slug=user).order_by('-publish_date'))
        serializers = PostsPublicSerializer(instances, many=True)        
        return Response(serializers.data)

    def post( self, request, company):
        serializers = PostsPrivateSerializer( data = request.data)
        if serializers.is_valid(raise_exception=True):
            serializers.save()
            return Response(serializers.data)       
        
class IdPostsPublicView(APIView):
    def get( self, request, user):
        instances = get_list_or_404(PostsPublic.objects.filter( author=user).order_by('-publish_date'))
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
        instances = PostsPrivate.objects.filter(author__employee__company__slug = company)
        serializers = PostsPrivateSerializer(instances, many=True)
        return Response(serializers.data)

    def post( self, request, company):
        serializers = PostsPrivateSerializer( data = request.data)
        if serializers.is_valid(raise_exception=True):
            serializers.save()
            return Response(serializers.data)
        
class IdPostsPrivateView(APIView):
    def get( self, request, id):
        instances = PostsPrivate.objects.filter(author__employee__company = id)
        serializers = PostsPrivateSerializer(instances, many=True)
        return Response(serializers.data)

    def post( self, request, company):
        serializers = PostsPrivateSerializer( data = request.data)
        if serializers.is_valid(raise_exception=True):
            serializers.save()
            return Response(serializers.data)
        
        
class AllPublicCommentView(APIView):
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
        
class AllPrivateCommentView(APIView):
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

class PublicCommentView(APIView):
    def get( self, request, post):
        instances = PostsPublicComments.objects.filter(post = post)
        serializers = PostsPublicCommentsSerializer(instances, many=True)
        return Response(serializers.data)
    
    def post( self, request):
        print("data : ", request.data)
        serializers = PostsPublicCommentsSerializer( data = request.data)
        if serializers.is_valid(raise_exception=True):
            serializers.save()
            return Response(serializers.data)
        
class PrivateCommentView(APIView):
    def get( self, request, post):
        instances = PostsPrivateComments.objects.filter(post = post)
        serializers = PostsPrivateCommentsSerializer(instances, many=True)
        return Response(serializers.data)
    
    def post( self, request):
        print("data : ", request.data)
        serializers = PostsPrivateCommentsSerializer( data = request.data)
        if serializers.is_valid(raise_exception=True):
            serializers.save()
            return Response(serializers.data)

class AllPublicLikesView(APIView):
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

class AllPrivateLikesView(APIView):
    def get( self, request):
        output = [{
            "id": output.id,
            "post_id": output.post_id,
            "like_id": output.like_id,
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
        else:
            print(serializers.errors)

class PublicLikesView(APIView):
    def get( self, request, post):
        instances = PostsPublicLikes.objects.filter(post = post)
        serializers = PostsPublicLikesSerializer(instances, many=True)
        return Response(serializers.data)
    
    def post( self, request):
        print("data : ", request.data)
        serializers = PostsPublicLikesSerializer( data = request.data)
        if serializers.is_valid(raise_exception=True):
            serializers.save()
            return Response(serializers.data)
        

class PrivateLikesView(APIView):
    def get( self, request, post):
        instances = PostsPrivateLikes.objects.filter(post = post)
        serializers =PostsPrivateLikesSerializer(instances, many=True)
        return Response(serializers.data)
    
    def post( self, request):
        print("data : ", request.data)
        serializers = PostsPrivateLikesSerializer( data = request.data)
        if serializers.is_valid(raise_exception=True):
            serializers.save()
            return Response(serializers.data)