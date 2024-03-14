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
        print("IN USERS API")
        serializer = UsersSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
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
        serializer = UsersCredentialSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class AddressView(APIView):
    def get(self, request, id):
        try:
            instance = get_object_or_404(Address, id=id)
            serializers = AddressSerializer(instance)
            return Response(serializers.data)
        except Http404:
            return Response({'error': 'Address instance not found.'}, status=404)    
    def post( self, request, id):
        serializer = AddressSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class EducationView(APIView):
    def get(self, request, user):
        try:
            instance = get_object_or_404(EducationDetails, user_id=user)
            serializers = EducationSerializer(instance)
            return Response(serializers.data)
        except Http404:
            return Response({'error': 'Education instance not found.'}, status=404)    
    def post( self, request):
        serializer = EducationSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class UniversityView(APIView):
    def get(self, request, user):
        try:
            instances = get_list_or_404(UniversityDetails, user_id=user)
            serializers = UniversitySerializer(instances, many=True)
            return Response(serializers.data)
        except Http404:
            return Response({'error': 'University instance not found.'}, status=404)    
    
    def post( self, request):
        serializer = UniversitySerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
        
class CompaniesView(APIView):
    def get( self, request):
        try:
            output = [{
                "company_id": output.company_id,
                "company_name": output.company_name,
                "slug": output.slug,
                "description": output.description,
                "image": str(output.image.url) if output.image else '',
                "creation_date": output.creation_date,
                "address": str(output.address),
                "phone": str(output.phone)
                }for output in Companies.objects.all()
            ]
            return Response(output)
        except UnicodeDecodeError:
            return Response({"error": "UnicodeDecodeError occurred while processing data"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def post( self, request):
        print("DATA IN API: ", request.data)
        serializer = CompaniesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class CompanyView(APIView):    
    def get( self, request, pk):
        instance = get_object_or_404(Companies, slug=pk)
        serializers = CompaniesSerializer(instance)
        # print(serializers.data)
        return Response(serializers.data)
    def post( self, request, pk):
        print("DATA IN API: ", request.data)
        serializer = CompaniesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class WorkRequestsView(APIView):
    def get( self, request, company):
        instances = get_list_or_404(WorkRequests.objects.filter( company=company, status="P"))
        serializers = WorkRequestsSerializer(instances, many=True)        
        return Response(serializers.data)
    
    def post( self, request):
        print(request.data)
        serializer = WorkRequestsSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GetWorkRequestView(APIView):
    def get( self, request, user):
        instance = get_object_or_404(WorkRequests, user=user)
        serializers = WorkRequestsSerializer(instance)
        return Response(serializers.data)
    
    def post( self, request, user):
        print("DATA IN API -> ", request.data)
        serializer = WorkRequestsSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserCompanyRequestView(APIView):
    def get( self, request, user, company):
        instance = get_object_or_404(WorkRequests, user=user, company=company)
        serializers = WorkRequestsSerializer(instance)
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
        serializer = WorksOnSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
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
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class FriendRequest(APIView):
    def get( self, request):
        user1 = request.data.get("user1")
        reque = request.data.get("request")
        try:
            # request.query_params
            instance = get_object_or_404(FriendRequests, user1=user1, request=reque)
            print("INSTANCE: ",instance)
            serializers = FriendsRequestsSerializer(instance)
            return Response(serializers.data)
        except Http404:
            return Response({'error': 'FriendRequests instance not found.'}, status=404)  
    def post( self, request):
        print("IN API" ,request.data)
        serializer = FriendsRequestsSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
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
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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
        serializer = PostsPrivateSerializer( data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
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
        serializer = PostsPrivateSerializer( data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
# CALL ON EVERY NEW POST TO UPDATE THE ARRAY OF POSTS
class PostPublicView(APIView):
    def get( self, request, post):
        instance = get_object_or_404(PostsPublic, post_id=post)
        serializers = PostsPublicSerializer(instance)
        return Response(serializers.data)
    
# CALL ON EVERY NEW POST TO UPDATE THE ARRAY OF POSTS
class PostPrivateView(APIView):
    def get( self, request, post):
        instance = get_object_or_404(PostsPrivate, post_id=post)
        serializers = PostsPrivateSerializer(instance)
        return Response(serializers.data)

class PostsPrivateView(APIView):    
    def get( self, request, company):
        instances = PostsPrivate.objects.filter(author__employee__company__slug = company)
        serializers = PostsPrivateSerializer(instances, many=True)
        return Response(serializers.data)

    def post( self, request, company):
        serializer = PostsPrivateSerializer( data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class IdPostsPrivateView(APIView):
    def get( self, request, id):
        instances = PostsPrivate.objects.filter(author__employee__company = id)
        serializers = PostsPrivateSerializer(instances, many=True)
        return Response(serializers.data)

    def post( self, request, company):
        serializer = PostsPrivateSerializer( data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        
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
        serializer = PostsPublicCommentsSerializer( data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
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
        serializer = PostsPrivateCommentsSerializer( data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PublicCommentView(APIView):
    def get( self, request, post):
        instances = PostsPublicComments.objects.filter(post = post)
        serializers = PostsPublicCommentsSerializer(instances, many=True)
        return Response(serializers.data)
    
    def post( self, request):
        print("data : ", request.data)
        serializer = PostsPublicCommentsSerializer( data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class PrivateCommentView(APIView):
    def get( self, request, post):
        instances = PostsPrivateComments.objects.filter(post = post)
        serializers = PostsPrivateCommentsSerializer(instances, many=True)
        return Response(serializers.data)
    
    def post( self, request):
        print("data : ", request.data)
        serializer = PostsPrivateCommentsSerializer( data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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
        serializer = PublicLikesSerializer( data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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
        serializer = PrivateLikesSerializer( data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PublicLikesView(APIView):
    def get( self, request, post):
        instances = PostsPublicLikes.objects.filter(post = post)
        serializers = PostsPublicLikesSerializer(instances, many=True)
        return Response(serializers.data)
    
    def post( self, request):
        print("data : ", request.data)
        serializer = PostsPublicLikesSerializer( data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PrivateLikesView(APIView):
    def get( self, request, post):
        instances = PostsPrivateLikes.objects.filter(post = post)
        serializers =PostsPrivateLikesSerializer(instances, many=True)
        return Response(serializers.data)
    
    def post( self, request):
        print("data : ", request.data)
        serializer = PostsPrivateLikesSerializer( data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)