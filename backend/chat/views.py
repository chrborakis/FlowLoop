import json
from django.http import JsonResponse
import requests
from backend.api.serializers import *
from apps.users.models import *
from django.views.decorators.csrf import csrf_exempt
from backend.util import get_base_url, get_workson_instance

@csrf_exempt
def conversation(request, user, friend):
    base_url = get_base_url(request)
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))   
        print(data)
        try:
            response = requests.post(base_url+'/backend/api/conversation/'+str(user)+'/'+str(friend), json=data)
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

    elif request.method == 'GET':
        if user and friend:
            base_url = get_base_url(request)
            try:
                response = requests.get(base_url+'/backend/api/conversation/'+str(user)+'/'+str(friend))
                if response.status_code == 200:

                    return JsonResponse({
                        'message': 'Conversation Fetched succesfully',
                        'data': response.json(),
                        'status': response.status_code
                    })  
                else:
                    return JsonResponse({
                        'message': 'Failed to fetch Conversation ',
                        'data': response.json(),
                        'status': response.status_code
                    })
            except Exception as e:
                return JsonResponse({'error':str(e)}, status=400)
        