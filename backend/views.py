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

from backend.util import get_base_url, get_workson_instance

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
        
@csrf_exempt
def company(request, pk):
    base_url = get_base_url(request)
    # if request.method == 'POST':
        # data = json.loads(request.body.decode('utf-8'))
        # post = {
        #     "author": data.get('author'),
        #     "title":  data.get('title'),
        #     "body":   data.get('body'),
        #     "image":  data.get('image')
        # }
        # base_url = get_base_url(request)
        # try:
        #     response = requests.post(base_url+'/backend/api/postpublic', json=post)
        #     print("new_post data:", response.json())
        #     return JsonResponse({
        #         'message': 'Posts Public Succesfully posting',
        #         'data': response.json(),
        #         'status': response.status_code
        #     })
        # except:
        #     return JsonResponse({
        #         'message': 'Post Public Failed posting',
        #         'data': response.json(),
        #         'status': response.status_code
        #     })
    if request.method == 'GET':
        response = requests.get(base_url+'/backend/api/companies/'+str(pk))
        print(response.json())
        return JsonResponse({
            'message': 'Company Fetched succesfully',
            'data': response.json(),
            'status': response.status_code
        })
        
@csrf_exempt
def workrequests(request):
    base_url = get_base_url(request)
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        # req = {        
        #     "user":    data.get('user'),
        #     "company": data.get('company'),
        #     "status":     data.get('status')
        # }
        response = requests.post(base_url+'/backend/api/workrequests', json=data)
        result = response.json()
        status = result.get("status")
        work = None
        if( status == 'A'):
            print("WORK ON INSTANCE EXISTS")
            workOn = get_workson_instance(data.get('user'))
            work = {"company": workOn.data["company"], "work_id": workOn.data["id"]}
            # user1['company'] = workOn.data['company']
            # user1['work_id'] = workOn.data['id']
        return JsonResponse({
            'message': 'Work Request POST succesfully',
            'data': response.json(),
            "work": work,
            'status': response.status_code
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
def post_public(request, user):
    base_url = get_base_url(request)
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        base_url = get_base_url(request)
        try:
            response = requests.post(base_url+'/backend/api/postpublic', json=data)
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
        print("USER", user)
        print(type(user))
        response = None
        if user == '0':
            response = requests.get(base_url+'/backend/api/postpublic')
        elif user != '0':
            response = requests.get(base_url+'/backend/api/postpublic/'+str(user))
        print(response.json())

        data = None
        message = 'Posts Public Fetched FAILED'
        if( response.json()):
            message = 'Posts Public Fetched succesfully'
            data = response.json()

        return JsonResponse({
            'message': message,
            'data': data,
            'status': response.status_code
        })


# @action(detail=True, methods=['get'])
# class SinglePostPublic(APIView):
#     def get( self, request, post, *args, **kwargs):
#         try:
#             instance = get_object_or_404(PostsPublic, post_id=post)
#             serializers = PostsPublicSerializer(instance)        
#             print("SERIALIZERS DATA: ", serializers.data)
#             return JsonResponse({
#                 'message': 'Posts Public Fetched succesfully',
#                 'data': serializers.data,
#                 'status': status.HTTP_200_OK
#             })
        
#         except ValueError as err:
#             return JsonResponse({'message': str(err),'status': status.HTTP_400_BAD_REQUEST})
#         except Exception as err:
#             return JsonResponse({'message': str(err),'status': status.HTTP_500_INTERNAL_SERVER_ERROR})
        
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

# @action(detail=True, methods=['get'])
# class SinglePostPrivate(APIView):
#     def get( self, request, post, *args, **kwargs):
#         try:
#             instance = get_object_or_404(PostsPrivate, post_id=post)
#             serializers = PostsPrivateSerializer(instance)        
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
def public_comments(request, post):
    base_url = get_base_url(request)
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        base_url = get_base_url(request)
        try:
            response = requests.post(base_url+'/backend/api/postpubliccomments', json=data)
            print("new_comment data:", response.json())
            return JsonResponse({
                'message': 'Public Comment Succesfully posting',
                'data': response.json(),
                'status': response.status_code
            })
        except:
            return JsonResponse({
                'message': 'Public Comment Failed posting',
                'data': response.json(),
                'status': response.status_code
            })
    elif request.method == 'GET':
        response = requests.get(base_url+'/backend/api/postpubliccomments/'+str(post))
        return JsonResponse({
            'message': 'Public Comment Fetched succesfully',
            'data': response.json(),
            'status': response.status_code
        })

@csrf_exempt
def private_comments(request, post):
    base_url = get_base_url(request)
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        base_url = get_base_url(request)
        try:
            response = requests.post(base_url+'/backend/api/postprivatecomments', json=data)
            print("new_comment data:", response.json())
            return JsonResponse({
                'message': 'Private Comment Succesfully posting',
                'data': response.json(),
                'status': response.status_code
            })
        except:
            return JsonResponse({
                'message': 'Private Comment Failed posting',
                'data': response.json(),
                'status': response.status_code
            })
    elif request.method == 'GET':
        response = requests.get(base_url+'/backend/api/postprivatecomments/'+str(post))
        return JsonResponse({
            'message': 'Private Comment Fetched succesfully',
            'data': response.json(),
            'status': response.status_code
        })
        
# @action(detail=True, methods=['get'])
# class GetPublicLikes(APIView):
#     def get(self,request,slug,*args,**kwargs):
#         try:
#             instances = get_list_or_404(PostsPublicLikes, post=slug)
#             serializers = PostsPublicLikesSerializer(instances, many=True)

#             return JsonResponse({
#                 'message': "Post Public Likes Fetched succesfully",
#                 'data': serializers.data,
#                 'count': len(instances),
#                 'status': status.HTTP_200_OK
#             })

#         except ValueError as err:
#             return JsonResponse({'message': str(err),'status': status.HTTP_400_BAD_REQUEST})
#         except Exception as err:
#             return JsonResponse({'message': str(err),'status' : status.HTTP_500_INTERNAL_SERVER_ERROR})
        
@csrf_exempt
def public_likes(request, post):
    base_url = get_base_url(request)
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        base_url = get_base_url(request)
        try:
            response = requests.post(base_url+'/backend/api/publiclikes', json=data)
            print("new_Like data:", response.json())
            return JsonResponse({
                'message': 'Public Like Succesfully posting',
                'data': response.json(),
                'status': response.status_code
            })
        except:
            return JsonResponse({
                'message': 'Public Like Failed posting',
                'data': response.json(),
                'status': response.status_code
            })
    elif request.method == 'GET':
        response = requests.get(base_url+'/backend/api/publiclikes/'+str(post))
        return JsonResponse({
            'message': 'Public Like Fetched succesfully',
            'data': response.json(),
            'status': response.status_code
        })
    
@csrf_exempt
def private_likes(request, post):
    base_url = get_base_url(request)
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        base_url = get_base_url(request)
        try:
            response = requests.post(base_url+'/backend/api/privatelikes', json=data)
            print("new_Like data:", response.json())
            return JsonResponse({
                'message': 'Private Like Succesfully posting',
                'data': response.json(),
                'status': response.status_code
            })
        except:
            return JsonResponse({
                'message': 'Private Like Failed posting',
                'data': response.json(),
                'status': response.status_code
            })
    elif request.method == 'GET':
        response = requests.get(base_url+'/backend/api/privatelikes/'+str(post))
        return JsonResponse({
            'message': 'Private Like Fetched succesfully',
            'data': response.json(),
            'status': response.status_code
        })

# @action(detail=True, methods=['get'])
# class GetPrivateLikes(APIView):
#     def get(self,request,slug,*args,**kwargs):
#         try:
#             instances = get_list_or_404(PostsPrivateLikes, post_id=slug)
#             serializers = PostsPrivateLikesSerializer(instances, many=True)

#             return JsonResponse({
#                 'message': "Post Private Likes Fetched succesfully",
#                 'data': serializers.data,
#                 'count': len(instances),
#                 'status': status.HTTP_200_OK
#             })

#         except ValueError as err:
#             return JsonResponse({'message': str(err),'status': status.HTTP_400_BAD_REQUEST})
#         except Exception as err:
#             return JsonResponse({'message': str(err),'status': status.HTTP_500_INTERNAL_SERVER_ERROR})
        