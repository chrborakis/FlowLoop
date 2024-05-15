import json
from django.http import JsonResponse
from django.shortcuts import render
import requests
from django.views.decorators.csrf import csrf_exempt
from backend.util import get_base_url

@csrf_exempt
def groups(request, user):
    base_url = get_base_url(request)
    if request.method == 'GET':
        if user:
            base_url = get_base_url(request)
            try:
                response = requests.get(base_url+'/backend/api/groups/'+str(user))
                if response.status_code == 200:

                    return JsonResponse({
                        'message': 'Groups Fetched succesfully',
                        'data': response.json(),
                        'status': response.status_code
                    })  
                else:
                    return JsonResponse({
                        'message': 'Failed to fetch Groups ',
                        'data': response.json(),
                        'status': response.status_code
                    })
            except Exception as e:
                return JsonResponse({'error':str(e)}, status=400)
        
@csrf_exempt
def conversation(request, group):
    base_url = get_base_url(request)
    if request.method == 'GET':
        if group:
            base_url = get_base_url(request)
            try:
                response = requests.get(base_url+'/backend/api/group_chat/'+str(group))
                if response.status_code == 200:

                    return JsonResponse({
                        'message': 'GroupChats Fetched succesfully',
                        'data': response.json(),
                        'status': response.status_code
                    })  
                else:
                    return JsonResponse({
                        'message': 'Failed to fetch GroupChats ',
                        'data': response.json(),
                        'status': response.status_code
                    })
            except Exception as e:
                return JsonResponse({'error':str(e)}, status=400)
    elif request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))   
        print(data)
        try:
            response = requests.post(base_url+'/backend/api/group_chat/'+str(group), json=data)
            if response.status_code == 200:
                return JsonResponse({
                    'message': 'Message POST succesfully',
                    'data': response.json(),
                    'status': response.status_code
                })
            else:
                return JsonResponse({
                    'message': 'Failed to POST Message',
                    'data': response.json(),
                    'status': response.status_code
                })
        except Exception as e:
            return JsonResponse({
                'message': str(e),
                'data': response.json(),
                'status': response.status_code
            })