import json
from django.http import HttpResponse, JsonResponse
from django.shortcuts import get_list_or_404, render
import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import HttpRequest
from backend.api.serializers import *
from apps.users.models import *
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import action
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.http import require_POST

from backend.get_url import get_base_url

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
        
# @action(detail=True, methods=['get'])
# class PostPublic(APIView):
#     def get( self, request, *args, **kwargs):
#         try:
#             instances = get_list_or_404(PostsPublic.objects.all())
#             serializers = PostsPublicSerializer(instances, many=True)        
#             print(serializers.data)
#             return JsonResponse({
#                 'message': 'Posts Public Fetched succesfully',
#                 'data': serializers.data,
#                 'status': status.HTTP_200_OK
#             })
        
#         except ValueError as err:
#             return JsonResponse({'message': str(err),'status': status.HTTP_400_BAD_REQUEST})
#         except Exception as err:
#             return JsonResponse({'message': str(err),'status': status.HTTP_500_INTERNAL_SERVER_ERROR})
        
@csrf_exempt
def post_public(request):
    base_url = get_base_url(request)
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        post = {
            "author": data.get('author'),
            "title":  data.get('title'),
            "body":   data.get('body'),
            "image":  data.get('image')
        }
        base_url = get_base_url(request)
        try:
            response = requests.post(base_url+'/backend/api/postpublic', json=post)
            print("new_post data:", response.json())
            return JsonResponse({
                'message': 'Posts Public Succesfully posting',
                'data': response.json(),
                'status': response.status_code
            })
        except:
            return JsonResponse({
                'message': 'Post Public Failed posting',
                'data': response.json(),
                'status': response.status_code
            })
    elif request.method == 'GET':
        response = requests.get(base_url+'/backend/api/postpublic')
        return JsonResponse({
            'message': 'Posts Public Fetched succesfully',
            'data': response.json(),
            'status': response.status_code
        })


@action(detail=True, methods=['get'])
class SinglePostPublic(APIView):
    def get( self, request, post, *args, **kwargs):
        try:
            instance = get_object_or_404(PostsPublic, post_id=post)
            serializers = PostsPublicSerializer(instance)        
            print("SERIALIZERS DATA: ", serializers.data)
            return JsonResponse({
                'message': 'Posts Public Fetched succesfully',
                'data': serializers.data,
                'status': status.HTTP_200_OK
            })
        
        except ValueError as err:
            return JsonResponse({'message': str(err),'status': status.HTTP_400_BAD_REQUEST})
        except Exception as err:
            return JsonResponse({'message': str(err),'status': status.HTTP_500_INTERNAL_SERVER_ERROR})
        
# @action(detail=True, methods=['get'])
# class PostPrivate(APIView):
#     def get( self, request, company, *args, **kwargs):
#         try:
#             # instances = get_list_or_404(PostsPrivate, author__employee__company = slug)
#             instances = PostsPrivate.objects.filter(author__employee__company = company)
#             serializers = PostsPrivateSerializer(instances, many=True)

#             # print(serializers.data)
#             return JsonResponse({
#                 'message': 'Posts Private Fetched succesfully',
#                 'data': serializers.data,
#                 'status': status.HTTP_200_OK
#             })

#         except ValueError as err:
#             return JsonResponse({'message': str(err),'status': status.HTTP_400_BAD_REQUEST})
#         except Exception as err:
#             return JsonResponse({'message': str(err),'status': status.HTTP_500_INTERNAL_SERVER_ERROR})
        
@csrf_exempt
def post_private(request, company):
    base_url = get_base_url(request)
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        post = {
            "author": data.get('author'),
            "title":  data.get('title'),
            "body":   data.get('body'),
            "image":  data.get('image')
        }
        base_url = get_base_url(request)
        print(post)
        try:
            response = requests.post(base_url+'/backend/api/postprivate', json=data)
            print("new_post data:", response.json())
            return JsonResponse({
                'message': 'Posts Private Succesfully posting',
                'data': response.json(),
                'status': response.status_code
            })
        except:
            return JsonResponse({
                'message': 'Post Private Failed posting',
                'data': response.json(),
                'status': response.status_code
            })
    elif request.method == 'GET':
        response = requests.get(base_url+'/backend/api/postprivate/'+str(company))
        print(response.json())
        return JsonResponse({
            'message': 'Posts Public Fetched succesfully',
            'data': response.json(),
            'status': response.status_code
        })

@action(detail=True, methods=['get'])
class SinglePostPrivate(APIView):
    def get( self, request, post, *args, **kwargs):
        try:
            instance = get_object_or_404(PostsPrivate, post_id=post)
            serializers = PostsPrivateSerializer(instance)        
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
        