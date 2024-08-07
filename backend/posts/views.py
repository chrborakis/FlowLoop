import json
from django.http import JsonResponse
import requests
from backend.api.serializers import *
from apps.users.models import *
from django.views.decorators.csrf import csrf_exempt
from django.core.paginator import Paginator
from backend.util import get_base_url, verify_token
from rest_framework import status

# Create your views here.
@csrf_exempt
def post_public(request, user):
    base_url = get_base_url(request)    
    if request.method == 'POST':
        token = request.headers.get('Authorization')
        if(verify_token(token)):
            author = int(request.POST.get('author'))
            try:
                author_instance = Users.objects.get(user=author)
                # print("DATA: ", json.loads(request.body.decode('utf-8')))
                new_inst = PostsPublic.objects.create(
                    title=request.POST.get('title'),
                    body=request.POST.get('body'),
                    author=author_instance,
                    image=request.FILES.get('image')
                )
                new_inst.save()
                response = requests.get(base_url+'/backend/api/post_public/'+str(new_inst.post_id))

                return JsonResponse({'message': 'Posts Public Succesfully posting','data': response.json()})
            except Exception as e:
                error_message = str(e) 
                return JsonResponse({'message': 'Post Public Failed posting','error': error_message})
        else:
            return JsonResponse({'message': 'Unauthorized - Token missing', 'status': status.HTTP_403_FORBIDDEN}) 
    elif request.method == 'GET':
        response = None
        if user == '0':
            try:
                queryset = PostsPublic.objects.all().order_by('-publish_date')
                paginator = Paginator(queryset, 5)
                page_number = request.GET.get('page')
                page_number = int(page_number) if page_number else 1
                page_obj = paginator.get_page(page_number)
                next_page_number = page_number + 1 if page_obj.has_next() else None
                serializer = PostsPublicSerializer(page_obj, many=True)
                return JsonResponse({
                    'message': 'Posts Public Fetched succesfully',
                    'data': serializer.data,
                    'has_next': next_page_number,'status': 200
                })
            except Exception as e:
                return JsonResponse({
                    'message': 'An error occurred while fetching posts public',
                    'error': str(e),'status': 500 
                })
        elif user != '0':
            try:
                queryset = PostsPublic.objects.filter(author__slug=str(user)).order_by('-publish_date')
                paginator = Paginator(queryset, 5)  #items per scroll down
                page_number = request.GET.get('page')
                page_number = int(page_number) if page_number else 1
                page_obj = paginator.get_page(page_number)
                next_page_number = page_number + 1 if page_obj.has_next() else None
                serializer = PostsPublicSerializer(page_obj, many=True)
                return JsonResponse({
                    'message': 'Posts Public Fetched succesfully',
                    'data': serializer.data, 
                    'has_next': next_page_number,
                    'status': 200
                })
            except Exception as e:
                return JsonResponse({
                    'message': 'An error occurred while fetching posts public',
                    'error': str(e),'status': 500 
                })
    elif request.method == 'DELETE':
        token = request.headers.get('Authorization')
        if(verify_token(token)):
            try:
                post_id = user
                item = PostsPublic.objects.get(post_id=post_id)
                item.delete()
                return JsonResponse({'message': '[DEL]PostPublic '+str(post_id)+' deleted','status': 200})
            except PostsPublic.DoesNotExist:return JsonResponse({'message': 'PostPublic '+str(post_id)+' not found','status': 404})
            except Exception as e: return JsonResponse({'message': str(e),'status': 500})
        else:
            return JsonResponse({'message': 'Unauthorized - Token missing', 'status': status.HTTP_403_FORBIDDEN}) 
    elif request.method == 'PATCH':
        token = request.headers.get('Authorization')
        if(verify_token(token)):
            post_id = user
            data = json.loads(request.body.decode('utf-8'))
            print(data)
            base_url = get_base_url(request)
            try:                                  
                response = requests.patch(base_url+'/backend/api/post_public/'+str(post_id), json=data)           
                if response.status_code == 200:
                    return JsonResponse({
                        'message': '[PATCH]PostPublic '+str(post_id)+' updated successfully',
                        'data':  response.json() ,'status': response.status_code
                    })
                else:
                    return JsonResponse({
                        'message': '[PATCH]PostPublic '+str(post_id)+' update failed',
                        'data':  response.json() ,'status': response.status_code
                    })
            except Exception as e:
                return JsonResponse({'message': str(e),'data': response.json(),'status': response.status_code})
        else:
            return JsonResponse({'message': 'Unauthorized - Token missing', 'status': status.HTTP_403_FORBIDDEN}) 



@csrf_exempt
def post_private(request, company):
    base_url = get_base_url(request)
    if request.method == 'POST':
        token = request.headers.get('Authorization')
        if(verify_token(token)):
            author= int(request.POST.get('author'))
            try:
                new_inst = PostsPrivate.objects.create(
                    title=request.POST.get('title'),
                    body=request.POST.get('body'),
                    author=WorksOn.objects.get(id=author),
                    image=request.FILES.get('image')
                )
                new_inst.save()
                response = requests.get(base_url+'/backend/api/post_private/'+str(new_inst.post_id))

                return JsonResponse({
                    'message': 'Posts Private Succesfully posting',
                    'data': response.json()
                })
            except Exception as e:
                error_message = str(e) 
                print("Error:", error_message)
                return JsonResponse({
                    'message': 'Post Private Failed posting','error': error_message})
        else:
            return JsonResponse({'message': 'Unauthorized - Token missing', 'status': status.HTTP_403_FORBIDDEN}) 

    elif request.method == 'GET':
        try:
            queryset = PostsPrivate.objects.filter(author__employee__company__slug = company).order_by('-publish_date')
            paginator = Paginator(queryset, 4)  #items per scroll down
            page_number = request.GET.get('page')
            page_number = int(page_number) if page_number else 1
            page_obj = paginator.get_page(page_number)
            next_page_number = page_number + 1 if page_obj.has_next() else None
            serializer = PostsPrivateSerializer(page_obj, many=True)
            return JsonResponse({
                'message': 'Posts Private Fetched succesfully',
                'data': serializer.data, 
                'has_next': next_page_number,
                'status': 200
            })
                # response = requests.get(base_url+'/backend/api/postpublic')
        except Exception as e:
            print(str(e))
            return JsonResponse({
                'message': 'An error occurred while fetching posts Private',
                'error': str(e),
                'status': 500
            })
    elif request.method == 'DELETE':
        token = request.headers.get('Authorization')
        if(verify_token(token)):
            try:
                post_id = company
                item = PostsPrivate.objects.get(post_id=post_id)
                item.delete()
                return JsonResponse({'message': '[DEL]PostPrivate '+str(post_id)+' deleted','status': 200})
            except PostsPrivate.DoesNotExist:return JsonResponse({'message': 'PostPrivate '+str(post_id)+' not found','status': 404})
            except Exception as e: return JsonResponse({'message': str(e),'status': 500})
        else:
            return JsonResponse({'message': 'Unauthorized - Token missing', 'status': status.HTTP_403_FORBIDDEN}) 

    elif request.method == 'PATCH':
        token = request.headers.get('Authorization')
        if(verify_token(token)):
            post_id = company
            data = json.loads(request.body.decode('utf-8'))
            print(data)
            base_url = get_base_url(request)
            try:
                response = requests.patch(base_url+'/backend/api/post_private/'+str(post_id), json=data)
                print(response)

                if response.status_code == 200:
                    return JsonResponse({
                        'message': '[PATCH]PostPrivate '+str(post_id)+' updated successfully',
                        'data':  response.json() ,
                        'status': response.status_code
                    })
                else:
                    return JsonResponse({
                        'message': '[PATCH]PostPrivate '+str(post_id)+' update failed',
                        'data':  response.json() ,
                        'status': response.status_code
                    })
            except Exception as e:
                print(e)
                return JsonResponse({'message': str(e),'data': response.json(),'status': response.status_code})
        else:
            return JsonResponse({'message': 'Unauthorized - Token missing', 'status': status.HTTP_403_FORBIDDEN}) 


@csrf_exempt
def public_comments(request, post):
    base_url = get_base_url(request)
    if request.method == 'POST':
        token = request.headers.get('Authorization')
        if(verify_token(token)):
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
        else:
            return JsonResponse({'message': 'Unauthorized - Token missing', 'status': status.HTTP_403_FORBIDDEN}) 

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
        token = request.headers.get('Authorization')
        if(verify_token(token)):
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
        else:
            return JsonResponse({'message': 'Unauthorized - Token missing', 'status': status.HTTP_403_FORBIDDEN}) 

    elif request.method == 'GET':
        response = requests.get(base_url+'/backend/api/postprivatecomments/'+str(post))
        return JsonResponse({
            'message': 'Private Comment Fetched succesfully',
            'data': response.json(),
            'status': response.status_code
        })
                
@csrf_exempt
def public_likes(request, post):
    base_url = get_base_url(request)
    if request.method == 'POST':
        token = request.headers.get('Authorization')
        if(verify_token(token)):
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
        else:
            return JsonResponse({'message': 'Unauthorized - Token missing', 'status': status.HTTP_403_FORBIDDEN}) 

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
        token = request.headers.get('Authorization')
        if(verify_token(token)):
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
        else:
            return JsonResponse({'message': 'Unauthorized - Token missing', 'status': status.HTTP_403_FORBIDDEN}) 

    elif request.method == 'GET':
        response = requests.get(base_url+'/backend/api/privatelikes/'+str(post))
        return JsonResponse({
            'message': 'Private Like Fetched succesfully',
            'data': response.json(),
            'status': response.status_code
        })