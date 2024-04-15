import json
from urllib.parse import urljoin
from django.conf import settings
from django.http import Http404, JsonResponse
import requests
from rest_framework.views import APIView
from backend.api.serializers import *
from apps.users.models import *
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import action
from backend.util import get_base_url, get_workson_instance
from PIL import Image
from io import BytesIO

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
    def patch( self,request,slug):
        new_image =request.FILES.get('image')
        if new_image is None:
            return JsonResponse({'error': 'No image provided'}, status=400)
        
        image = Image.open(new_image)

        resized_image = image.resize((150, 150))

        output_io = BytesIO()
        resized_image.save(output_io, format='JPEG') 

        try:
            user = Users.objects.get(user_id=slug)
            user.image.save(new_image.name, output_io, save=False)
            user.save()
            updated_image_url = urljoin(settings.MEDIA_URL, user.image.url)
            return JsonResponse({'message': 'Image updated successfully', 'data': updated_image_url}, status=200)

        except Exception as e:
            print(e)
            return JsonResponse({'message': 'Image updated successfully', 
                'error': str(e),
                'status':200}
            )
    
def friends(request, user):
    print("user: ", user)
    if request.method == 'GET':
        if user:
            base_url = get_base_url(request)
            try:
                response = requests.get(base_url+'/backend/api/friends/'+str(user))
                print(response)    
                if response.status_code == 200:
                    return JsonResponse({
                        'message': str(user)+' Friends fetched successfully',
                        'data': response.json(),
                        'status': response.status_code
                    })
                else:
                    return JsonResponse({
                        'message': 'Failed to fethch Friends '+str(user),
                        'data': response.json(),
                        'status': response.status_code
                    })
            except Exception as e:
                return JsonResponse({'error':str(e)}, status=status.HTTP_400_BAD_REQUEST)
            
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
            response_data = response.json()
            if response.status_code == 404:
                data = { 'user1':request_param, 'request':user1}
                response = requests.get(base_url+'/backend/api/friend_requests/', json=data)
                response_data = response.json()
                response_data["status"] = "reply"
            print("RESPONSE -> ",response.json())
            return JsonResponse({
                'message': 'Friend Request Fetched succesfully',
                'data': response_data,
                'status': response.status_code
            })  
        except Exception as e:
            return JsonResponse({
                'message': str(e),
                'data': response.json(),
                'status': response.status_code
            })