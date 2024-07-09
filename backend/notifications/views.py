import json
from django.http import JsonResponse
import requests
from backend.api.serializers import *
from apps.users.models import *
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt

from backend.util import get_base_url, get_workson_instance, verify_token

@csrf_exempt
def notifications(request,user):
    if request.method == 'PATCH':
        # token = request.headers.get('Authorization')
        # if(verify_token(token)):
        base_url = get_base_url(request)
        try:
            notification = user
            response = requests.patch(base_url+'/backend/api/notifications/'+str(notification))
            if response.status_code == 200:
                return JsonResponse({
                    'message': '[PATCH]Notification '+str(notification)+' read successfully',
                    'data':  response.json(), 'status': response.status_code
                })
            else:
                return JsonResponse({
                    'message': '[PATCH]Notification '+str(notification)+' read failed',
                    'data':  response.json(), 'status': response.status_code
                })
        except Exception as e:
            return JsonResponse({'message': str(e),'data': response.json(),'status': response.status_code})
        # else:
            # return JsonResponse({'message': 'Unauthorized - Token missing', 'status': status.HTTP_403_FORBIDDEN}) 
        
    elif request.method == 'POST':
        # token = request.headers.get('Authorization')
        # if(verify_token(token)):
        data = json.loads(request.body.decode('utf-8'))
        print(data)
        base_url = get_base_url(request)
        try:
            response = requests.post(base_url+'/backend/api/notifications/0', json=data)

            if response.status_code == 200:
                return JsonResponse({
                    'message': '[POST]Notification send successfully',
                    'data':  response.json(), 'status': response.status_code
                })
            else:
                return JsonResponse({
                    'message': '[POST]Notification send failed',
                    'data':  response.json(), 'status': response.status_code
                })
        except Exception as e:
            return JsonResponse({'message': str(e),'data': response.json(),'status': response.status_code})
        # else:
            # return JsonResponse({'message': 'Unauthorized - Token missing', 'status': status.HTTP_403_FORBIDDEN}) 
        
    elif request.method == 'GET':
        if user:
            base_url = get_base_url(request)
            try:
                response = requests.get(base_url+'/backend/api/notifications/'+str(user))
                if response.status_code == 200:
                    return JsonResponse({
                        'message': str(user)+' Notifications fetched successfully',
                        'data': response.json(),
                        'status': response.status_code
                    })
                else:
                    return JsonResponse({
                        'message': 'Failed to fetch Notifications '+str(id),
                        'data': response.json(),
                        'status': response.status_code
                    })
            except Exception as e:
                return JsonResponse({'error':str(e)}, status=status.HTTP_400_BAD_REQUEST)
            

@csrf_exempt
def requests_notifications(request,user):
    if request.method == 'PATCH':
        base_url = get_base_url(request)
        try:
            request = user
            response = requests.patch(base_url+'/backend/api/requests/'+str(request))
            if response.status_code == 200:
                return JsonResponse({'message': '[PATCH]Request '+str(request)+' read successfully', 'status': response.status_code})
            else:
                return JsonResponse({
                    'message': '[PATCH]Request '+str(request)+' read failed', 'status': response.status_code
                })
        except Exception as e:
            return JsonResponse({'message': str(e), 'status': response.status_code})
    elif request.method == 'GET':
        if user:
            base_url = get_base_url(request)
            try:
                response = requests.get(base_url+'/backend/api/requests/'+str(user))
                if response.status_code == 200:
                    return JsonResponse({
                        'message': str(user)+' Requests fetched successfully',
                        'data': response.json(),
                        'status': response.status_code
                    })
                else:
                    return JsonResponse({
                        'message': 'Failed to fetch Requests '+str(id),
                        'data': response.json(),
                        'status': response.status_code
                    })
            except Exception as e:
                return JsonResponse({'error':str(e)}, status=status.HTTP_400_BAD_REQUEST)