import json
from django.forms import model_to_dict
from django.http import Http404, HttpResponse, JsonResponse
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
from django.core.paginator import Paginator
from backend.util import get_base_url, get_workson_instance

@action(detail=True, methods=['post'])
class UserProfile(APIView):
    def get(self,request,slug,*args,**kwargs):
        instance = get_object_or_404(Users, slug=slug)
        try:
            serializers = UsersSerializer(instance)
            workOn = get_workson_instance(serializers.data['user'])
            return JsonResponse({
                'message': 'User Data Fetched succesfully',
                'data': serializers.data,
                'workon': workOn or None,
                'status': status.HTTP_200_OK
            })
        except Http404:
            return JsonResponse({'error': 'User not found', 'status': status.HTTP_404_NOT_FOUND})
        except Exception as err:
            return JsonResponse({'error': str(err), 'status': status.HTTP_400_BAD_REQUEST})
        
    def post(self,request,slug):
        data = request.data.get('data', {})
        instance = get_object_or_404(Users, slug=slug)
        try:
            serializer = UsersSerializer(instance, data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse({'data':serializer.data, "status":status.HTTP_200_OK})
            else:
                print(serializer.errors)
                return JsonResponse({'error': serializer.errors,'status': status.HTTP_400_BAD_REQUEST}) 
        except Http404:
            return JsonResponse({'error': 'User not found', 'status': status.HTTP_404_NOT_FOUND})
        except ValidationError as err:
            return JsonResponse({'error': str(err)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as err:
            return JsonResponse({'error': str(err)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@csrf_exempt
def education(request, user):
    base_url = get_base_url(request)
    if request.method == "POST":
        data = json.loads(request.body.decode('utf-8'))
        print("DATA", data)
        instance = get_object_or_404(EducationDetails, id=data.get("id"))
        try:
            serializer = EducationSerializer(instance, data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse({'data':serializer.data, "status":status.HTTP_200_OK})
            else:
                print(serializer.errors)
                return JsonResponse({'error': serializer.errors,'status': status.HTTP_400_BAD_REQUEST}) 
        except Http404:
            return JsonResponse({'error': 'Edu details not found', 'status': status.HTTP_404_NOT_FOUND})
        except ValidationError as err:
            return JsonResponse({'error': str(err)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as err:
            return JsonResponse({'error': str(err)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
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
    if request.method == "POST":
        data = json.loads(request.body.decode('utf-8'))
        print("DATA", data)
        log = {}
        UniversityDetails.objects.filter(user=user).delete()
        for item in data:
            item.pop('id', None)
            try:
                serializer = UniversitySerializer(data = item)
                if serializer.is_valid(raise_exception=True):
                    serializer.save()
                    # return JsonResponse({'data':serializer.data, "status":status.HTTP_200_OK})
                else:
                    print(serializer.errors)
                    log = {'error': serializer.errors,'status': status.HTTP_400_BAD_REQUEST}
            except Http404:
                log = {'error': 'Uni details not found', 'status': status.HTTP_404_NOT_FOUND}
            except ValidationError as err:
                log = {'error': str(err), 'status': status.HTTP_400_BAD_REQUEST}
            except Exception as err:
                log = {'error': str(err), 'status': status.HTTP_500_INTERNAL_SERVER_ERROR}
        response = requests.get(base_url+'/backend/api/university/'+str(user))
        print(response.json())
        return JsonResponse({ 'data': response.json(), 'error': log.get('error'), "status":log.get('status')})
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

# In Friend Requests Modal - For approve or decline
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

# USER - IN User Profile Button for send requests or delete
@csrf_exempt
def friend_requests(request):
    base_url = get_base_url(request)
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))
            # data = { 'user1':user1, 'request':request_param}
            if data.get("status") == 'P':
                response = requests.post(base_url+'/backend/api/friend_requests/', json=data)
                if response.status_code == 200:
                    return JsonResponse({
                        'created': True,
                        'message': 'Friend Request POST succesfully',
                        'data': response.json(),
                        'status': response.status_code
                    })  
                else:
                    response.raise_for_status()
                if response.status_code == 404:
                    return JsonResponse({
                        'error': 'Friend Request POST failed',
                        'status': response.status_code
                    })  
            if data.get("status") == "D":
                try:
                    instance = get_object_or_404(FriendRequests, user1=data.get("user1"), request=data.get("request"))
                    instance.delete()
                    return JsonResponse({
                        'deleted': True,
                        'message': 'Friend deleted successfully',
                        "status":status.HTTP_200_OK
                    })  
                except Http404:
                    instance = get_object_or_404(FriendRequests, user1=data.get("request"), request=data.get("user1"))
                    instance.delete()
                    return JsonResponse({
                        'deleted': True,
                        'message': 'Friend deleted successfully',
                        "status":status.HTTP_200_OK
                    })  
            
        except requests.exceptions.RequestException as e:
            print("Friend Request Failed: ", e)

    elif request.method == 'GET':
        try:
            user1         = request.GET.get('user1')
            request_param = request.GET.get('request')
            data = { 'user1':user1, 'request':request_param}
            response = requests.get(base_url+'/backend/api/friend_requests/', json=data)
            if response.status_code == 404:
                data = { 'user1':request_param, 'request':user1}
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
        author = int(request.POST.get('author'))
        try:
            author_instance = Users.objects.get(user=author)
            print(author_instance)
            new_inst = PostsPublic.objects.create(
                title=request.POST.get('title'),
                body=request.POST.get('body'),
                author=author_instance,
                image=request.FILES.get('image')
            )
            new_inst.save()
            response = requests.get(base_url+'/backend/api/post_public/'+str(new_inst.post_id))

            return JsonResponse({
                'message': 'Posts Public Succesfully posting',
                'data': response.json()
            })
        except Exception as e:
            error_message = str(e) 
            print("Error:", error_message)
            return JsonResponse({
                'message': 'Post Public Failed posting',
                'error': error_message
            })
    elif request.method == 'GET':
        response = None
        if user == '0':
            try:
                queryset = PostsPublic.objects.all().order_by('-publish_date')
                paginator = Paginator(queryset, 5)  # 5 items per scroll down
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
                # response = requests.get(base_url+'/backend/api/postpublic')
            except Exception as e:
                print(str(e))
                return JsonResponse({
                    'message': 'An error occurred while fetching posts public',
                    'error': str(e),
                    'status': 500
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
                # response = requests.get(base_url+'/backend/api/postpublic')
            except Exception as e:
                print(str(e))
                return JsonResponse({
                    'message': 'An error occurred while fetching posts public',
                    'error': str(e),
                    'status': 500
                })

@csrf_exempt
def post_private(request, company):
    base_url = get_base_url(request)
    if request.method == 'POST':
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
                'message': 'Post Private Failed posting',
                'error': error_message
            })
    elif request.method == 'GET':
        try:
            queryset = PostsPrivate.objects.filter(author__employee__company__slug = company).order_by('-publish_date')
            paginator = Paginator(queryset, 5)  #items per scroll down
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
        # response = requests.get(base_url+'/backend/api/postprivate/'+str(company))
        # print(response.json())
        # return JsonResponse({
        #     'message': 'Posts Public Fetched succesfully',
        #     'data': response.json(),
        #     'status': response.status_code
        # })

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
