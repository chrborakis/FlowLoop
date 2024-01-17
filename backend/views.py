import json
from django.http import HttpResponse, JsonResponse
from django.shortcuts import get_list_or_404, render
from rest_framework.views import APIView
from rest_framework.response import Response

from backend.api.serializers import *
from apps.users.models import *
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import action

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
        except Exception as err:
            return JsonResponse({
                'message': err
            })
        
@action(detail=True, methods=['get'])
class GetPostPublic(APIView):
    def get( self, request, *args, **kwargs):
        try:
            instances = get_list_or_404(PostsPublic.objects.all())
            serializers = PostsPublicSerializer(instances, many=True)        
            # print(serializers.data)
            return JsonResponse({
                'message': 'Posts Public Fetched succesfully',
                'data': serializers.data,
                'status': status.HTTP_200_OK
            })
        
        except ValueError as err:
            return JsonResponse({'message': str(err),'status': status.HTTP_400_BAD_REQUEST})
        except Exception as err:
            return JsonResponse({'message': str(err),'status': status.HTTP_500_INTERNAL_SERVER_ERROR})
        
@action(detail=True, methods=['get'])
class GetPostPrivate(APIView):
    def get( self, request, slug, *args, **kwargs):
        try:
            # instances = get_list_or_404(PostsPrivate, author__employee__company = slug)
            instances = PostsPrivate.objects.filter(author__employee__company = slug)
            serializers = PostsPrivateSerializer(instances, many=True)

            # print(serializers.data)
            return JsonResponse({
                'message': 'Posts Private Fetched succesfully',
                'data': serializers.data,
                'status': status.HTTP_200_OK
            })

        except ValueError as err:
            return JsonResponse({'message': str(err),'status': status.HTTP_400_BAD_REQUEST})
        except Exception as err:
            return JsonResponse({'message': str(err),'status': status.HTTP_500_INTERNAL_SERVER_ERROR})
        
@action(detail=True, methods=['get'])
class GetPublicComments(APIView):
    def get( self, request, slug, *args, **kwargs):
        try:
            instances = get_list_or_404(PostsPublicComments, post_id=slug)
            serializers = PostsPublicCommentsSerializer(instances, many=True)

            return JsonResponse({
                'message': 'Post Public Comments Fetched succesfully',
                'data': serializers.data,
                'status': status.HTTP_200_OK
            })

        except ValueError as err:
            return JsonResponse({'message': str(err),'status': status.HTTP_400_BAD_REQUEST})
        except Exception as err:
            return JsonResponse({'message': str(err),'status': status.HTTP_500_INTERNAL_SERVER_ERROR})
        

@action(detail=True, methods=['get'])
class GetPrivateComments(APIView):
    def get( self, request, slug, *args, **kwargs):
        try:
            instances = get_list_or_404(PostsPrivateComments, post_id=slug)
            serializers = PostsPrivateCommentsSerializer(instances, many=True)

            return JsonResponse({
                'message': 'Post Private Comments Fetched succesfully',
                'data': serializers.data,
                'status': status.HTTP_200_OK
            })

        except ValueError as err:
            return JsonResponse({'message': str(err),'status': status.HTTP_400_BAD_REQUEST})
        except Exception as err:
            return JsonResponse({'message': str(err),'status': status.HTTP_500_INTERNAL_SERVER_ERROR})
        
@action(detail=True, methods=['get'])
class GetPublicLikes(APIView):
    def get(self,request,slug,*args,**kwargs):
        try:
            instances = get_list_or_404(PostsPublicLikes, post=slug)
            serializers = PostsPublicLikesSerializer(instances, many=True)

            return JsonResponse({
                'message': "Post Public Likes Fetched succesfully",
                'data': serializers.data,
                'count': len(instances),
                'status': status.HTTP_200_OK
            })

        except ValueError as err:
            return JsonResponse({'message': str(err),'status': status.HTTP_400_BAD_REQUEST})
        except Exception as err:
            return JsonResponse({'message': str(err),'status' : status.HTTP_500_INTERNAL_SERVER_ERROR})
        
@action(detail=True, methods=['get'])
class GetPrivateLikes(APIView):
    def get(self,request,slug,*args,**kwargs):
        try:
            instances = get_list_or_404(PostsPrivateLikes, post_id=slug)
            serializers = PostsPrivateLikesSerializer(instances, many=True)

            return JsonResponse({
                'message': "Post Private Likes Fetched succesfully",
                'data': serializers.data,
                'count': len(instances),
                'status': status.HTTP_200_OK
            })

        except ValueError as err:
            return JsonResponse({'message': str(err),'status': status.HTTP_400_BAD_REQUEST})
        except Exception as err:
            return JsonResponse({'message': str(err),'status': status.HTTP_500_INTERNAL_SERVER_ERROR})