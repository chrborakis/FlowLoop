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

            workOn = get_workson_instance(serializers.data['user'])

            return JsonResponse({
                'message': 'User Data Fetched succesfully',
                'data': serializers.data,
                'workon': workOn or None,
                'status': status.HTTP_200_OK
            })
        except Exception as err:
            return JsonResponse({
                'message': err
            })

@csrf_exempt
def education(request, user):
    base_url = get_base_url(request)
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        try:
            response = requests.post(base_url+'/backend/api/education/0', json=data)
            if response.status_code == 200:
                print(response.json())
                return JsonResponse({
                    'message': 'Education POST succesfully',
                    'data': response.json(),
                    'status': response.status_code
                })  
            else: response.raise_for_status()
        except requests.exceptions.RequestException as e:
            print("Education Request Failed: ", e)
        return None

    elif request.method == 'GET':
        response = requests.get(base_url+'/backend/api/education/'+str(user))
        print(response.json())
        return JsonResponse({
            'message': 'Education Fetched succesfully',
            'data': response.json(),
            'status': response.status_code
        })   

@csrf_exempt
def university(request, user):
    base_url = get_base_url(request)
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        try:
            response = requests.post(base_url+'/backend/api/university/0', json=data)
            if response.status_code == 200:
                print(response.json())
                return JsonResponse({
                    'message': 'university POST succesfully',
                    'data': response.json(),
                    'status': response.status_code
                })  
            else:
                response.raise_for_status()
        except requests.exceptions.RequestException as e:
            print("university Failed: ", e)
        return None

    elif request.method == 'GET':
        response = requests.get(base_url+'/backend/api/university/'+str(user))
        print(response.json())
        return JsonResponse({
            'message': 'university Fetched succesfully',
            'data': response.json(),
            'status': response.status_code
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


# THIS IS FOR HEADER REQUEST MODAL QUERY BY COMPANY_ID 
# for admins
@csrf_exempt
def workrequests(request, id):   
    base_url = get_base_url(request)  
    if request.method == 'GET':
        response = requests.get(base_url+'/backend/api/workrequests_comp/'+str(id)) #company_id, for each logged in admin
        print(response.json())
        return JsonResponse({
            'message': 'Work Requests Fetched succesfully',
            'data': response.json(),
            'status': response.status_code
        })    
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        status = data.get('status')
        
        instance = WorkRequests.objects.get(pk=id)     #work_request id
        if status=='A':
            instance.status = status
            instance.save()
        elif status=='D':
            instance.delete()
        
        return JsonResponse({'message': "Work Request: " + str(id) + "set to "+str(status)})
    else:
        return JsonResponse({'error': '[WORKREQ]Invalid request method'})
    
# FOR POST/GET ACTIONS BASED ON WORK_ID 
# for users
@csrf_exempt
def id_workrequests(request, user):
    base_url = get_base_url(request)
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        try:
            response = requests.post(base_url+'/backend/api/workrequests/0', json=data)
            if response.status_code == 200:
                result = response.json()
                status = result.get("status")
                work = None
                if( status == 'A'):
                    print("WORK ON INSTANCE EXISTS")
                    workOn = get_workson_instance(data.get('user'))
                    work = {"company": workOn.data["company"], "work_id": workOn.data["id"]}
                return JsonResponse({
                    'message': 'Work Request POST succesfully',
                    'data': response.json(),
                    "work": work,
                    'status': response.status_code
                })  
            else:
                response.raise_for_status()
        except requests.exceptions.RequestException as e:
            print("Work Request Failed: ", e)
        return None

    elif request.method == 'GET':
        response = requests.get(base_url+'/backend/api/workrequests/'+str(user))
        print(response.json())
        return JsonResponse({
            'message': 'Work Requests Fetched succesfully',
            'data': response.json(),
            'status': response.status_code
        })   

@csrf_exempt
def friend_requests_list(request, id):
    base_url = get_base_url(request)  
    if request.method == 'GET':
        response = requests.get(base_url+'/backend/api/friend_requests/'+str(id))
        print(response.json())
        return JsonResponse({
            'message': 'Friend Requests Fetched succesfully',
            'data': response.json(),
            'status': response.status_code
        })      
    elif request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))

        request = id
        user1  = data.get("req_id")
        status = data.get('status')

        print("BEFORE POST:" , request, user1, status)

        instance = FriendRequests.objects.get(request=id, user1=user1)     #friend_request id
        if status=='A':
            instance.status = status
            instance.save()
        elif status=='D':
            instance.delete()
        
        return JsonResponse({'message': "Friend Request: " + str(id) + "set to "+str(status)})
    else:
        return JsonResponse({'error': '[FRIENDREQ]Invalid request method'})


@csrf_exempt
def friend_requests(request):
    base_url = get_base_url(request)
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))
            print("DATA -> ", data)
            response = requests.post(base_url+'/backend/api/friend_requests/', json=data)
            if response.status_code == 200:
                return JsonResponse({
                    'message': 'Friend Request POST succesfully',
                    'data': response.json(),
                    'status': response.status_code
                })  
            else:
                response.raise_for_status()
            return JsonResponse({
                'message': 'Friend Request POST succesfully',
                'data': response.json(),
                'status': response.status_code
            })  
        except requests.exceptions.RequestException as e:
            print("Friend Request Failed: ", e)
        return None

    elif request.method == 'GET':
        try:
            user1         = request.GET.get('user1')
            request_param = request.GET.get('request')
            data = { 'user1':user1, 'request':request_param}
            response = requests.get(base_url+'/backend/api/friend_requests/', json=data)
            print("RESPONSE -> ",response.json())
            return JsonResponse({
                'message': 'Friend Request Fetched succesfully',
                'data': response.json(),
                'status': response.status_code
            })  
        except requests.exceptions.RequestException as e:
            print("Friend Request Failed: ", e)
        return None
         

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
