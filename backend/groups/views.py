import json
from django.http import JsonResponse
from django.shortcuts import render
import requests
from django.views.decorators.csrf import csrf_exempt
from apps.groups.models import GroupAdmins, GroupMembers
from backend.util import get_base_url, verify_token
from rest_framework import status

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
                        'data': response.json(), 'status': response.status_code
                    })  
                else:
                    return JsonResponse({
                        'message': 'Failed to fetch Groups ',
                        'data': response.json(), 'status': response.status_code
                    })
            except Exception as e:
                return JsonResponse({'error':str(e)}, status=400)
        
@csrf_exempt
def group(request, group):
    base_url = get_base_url(request)
    if request.method == 'GET':
        if group:
            base_url = get_base_url(request)
            try:
                response = requests.get(base_url+'/backend/api/group/'+str(group))
                if response.status_code == 200:
                    return JsonResponse({
                        'message': 'Group Fetched succesfully',
                        'data': response.json(),'status': response.status_code
                    })  
                else:
                    return JsonResponse({
                        'message': 'Failed to fetch Group ' + str(group),
                        'data': response.json(),'status': response.status_code
                    })
            except Exception as e:
                return JsonResponse({'error':str(e)}, status=400)
    elif request.method == 'POST':
        token = request.headers.get('Authorization')
        if(verify_token(token)):
            data = json.loads(request.body.decode('utf-8'))   
            try:
                response = requests.post(base_url+'/backend/api/group/0', json=data)
                if response.status_code == 200:
                    return JsonResponse({
                        'message': 'New Group POST succesfully',
                        'data': response.json(),'status': response.status_code
                    })
                else:
                    return JsonResponse({
                        'message': 'Failed to POST New Group',
                        'data': response.json(),'status': response.status_code
                    })
            except Exception as e:
                return JsonResponse({'message': str(e),'data': response.json(),'status': response.status_code})
        else:
            return JsonResponse({'message': 'Unauthorized - Token missing', 'status': status.HTTP_403_FORBIDDEN}) 

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
                        'data': response.json(),'status': response.status_code
                    })  
                else:
                    return JsonResponse({
                        'message': 'Failed to fetch GroupChats ',
                        'data': response.json(),'status': response.status_code
                    })
            except Exception as e:
                return JsonResponse({'error':str(e)}, status=400)
    elif request.method == 'POST':
        token = request.headers.get('Authorization')
        if(verify_token(token)):
            data = json.loads(request.body.decode('utf-8'))   
            try:
                response = requests.post(base_url+'/backend/api/group_chat/'+str(group), json=data)
                if response.status_code == 200:
                    return JsonResponse({
                        'message': 'Message POST succesfully',
                        'data': response.json(),'status': response.status_code
                    })
                else:
                    return JsonResponse({
                        'message': 'Failed to POST Message',
                        'data': response.json(),'status': response.status_code
                    })
            except Exception as e:
                return JsonResponse({'message': str(e),'data': response.json(),'status': response.status_code})
        else:
            return JsonResponse({'message': 'Unauthorized - Token missing', 'status': status.HTTP_403_FORBIDDEN}) 

@csrf_exempt
def members(request, id):
    base_url = get_base_url(request)
    if request.method == 'GET':
        if id:
            group = id
            try:
                response = requests.get(base_url+'/backend/api/group_chat/'+str(group))
                if response.status_code == 200:
                    return JsonResponse({
                        'message': 'GroupChats Fetched succesfully',
                        'data': response.json(),'status': response.status_code
                    })  
                else:
                    return JsonResponse({
                        'message': 'Failed to fetch GroupChats ',
                        'data': response.json(),'status': response.status_code
                    })
            except Exception as e:
                return JsonResponse({'error':str(e)}, status=400)
            
    elif request.method == 'POST':
        token = request.headers.get('Authorization')
        if(verify_token(token)):
            data = json.loads(request.body.decode('utf-8'))   
            try:
                response = requests.post(base_url+'/backend/api/group_members/0', json=data)
                if response.status_code == 200:
                    return JsonResponse({
                        'message': 'Group Member POST succesfully',
                        'data': response.json(),'status': response.status_code
                    })
                else:
                    return JsonResponse({
                        'message': 'Failed to POST Group Member',
                        'data': response.json(),'status': response.status_code
                    })
            except Exception as e:
                return JsonResponse({'message': str(e),'data': response.json(),'status': response.status_code})
        else:
            return JsonResponse({'message': 'Unauthorized - Token missing', 'status': status.HTTP_403_FORBIDDEN}) 

    elif request.method == 'DELETE':
        token = request.headers.get('Authorization')
        if(verify_token(token)):
            if id:
                try:
                    member = id
                    item = GroupMembers.objects.get(id=member)
                    item.delete()
                    return JsonResponse({'message': '[DEL]GroupMember '+str(member)+' deleted','status': 200})
                except GroupMembers.DoesNotExist:return JsonResponse({'message': 'GroupMember '+str(member)+' not found','status': 404})
                except Exception as e: return JsonResponse({'message': str(e),'status': 500})
        else:
            return JsonResponse({'message': 'Unauthorized - Token missing', 'status': status.HTTP_403_FORBIDDEN}) 


@csrf_exempt
def admins(request, id):
    base_url = get_base_url(request)
    if request.method == 'POST':
        token = request.headers.get('Authorization')
        if(verify_token(token)):
            if id:
                try:
                    data = json.loads(request.body.decode('utf-8'))   
                    print(data)
                    response = requests.post(base_url+'/backend/api/group_admins/'+str(id), json=data)
                    if response.status_code == 200:
                        return JsonResponse({
                            'message': 'Group Admin POST succesfully',
                            'data': response.json(),'status': response.status_code
                        })
                    else:
                        return JsonResponse({
                            'message': 'Failed to POST Group Admin',
                            'data': response.json(),'status': response.status_code
                        })
                except Exception as e:
                    return JsonResponse({'message': str(e),'data': response.json(),'status': response.status_code })
        else:
            return JsonResponse({'message': 'Unauthorized - Token missing', 'status': status.HTTP_403_FORBIDDEN}) 
   
    elif request.method == 'DELETE':
        token = request.headers.get('Authorization')
        if(verify_token(token)):
            if id:
                try:
                    item = GroupAdmins.objects.get(admin=id)
                    item.delete()
                    return JsonResponse({'message': '[DEL]GroupAdmin '+str(id)+' deleted','status': 200})
                except GroupMembers.DoesNotExist:return JsonResponse({'message': 'GroupAdmin '+str(id)+' not found','status': 404})
                except Exception as e: return JsonResponse({'message': str(e),'status': 500})
            else: pass
        else:
            return JsonResponse({'message': 'Unauthorized - Token missing', 'status': status.HTTP_403_FORBIDDEN}) 


@csrf_exempt
def not_members(request, group, company):
    base_url = get_base_url(request)
    if request.method == 'GET':
        print(group,company)
        if group and company:
            try:
                response = requests.get(base_url+'/backend/api/group_not_members/'+str(group)+'/'+str(company))
                print(response)
                if response.status_code == 200:
                    return JsonResponse({
                        'message': 'Group avaliable Members Fetched succesfully',
                        'data': response.json(),'status': response.status_code
                    })  
                else:
                    return JsonResponse({
                        'message': 'Failed to fetch Group avaliable Members ',
                        'data': response.json(),'status': response.status_code
                    })
            except Exception as e:
                return JsonResponse({'error':str(e)}, status=400)