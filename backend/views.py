import json
from dateutil.parser import parse
from django.db.models import F
from django.http import Http404, JsonResponse
import requests
from backend.api.serializers import *
from apps.users.models import *
from rest_framework import status
from rest_framework.decorators import action
from django.shortcuts import get_list_or_404

from backend.util import get_base_url, get_workson_instance

def search_users(request, name):
    if request.method == 'GET':
        if name:
            try:
                users = get_list_or_404(Users.objects.filter(
                    slug__istartswith=name
                ).annotate(similarity=F('slug')).order_by('-similarity'))
                user_data = [{
                    'id': user.user_id,
                    'firstname': user.firstname,
                    'lastname': user.lastname,
                    'slug': user.slug,
                    'image': str(user.image)
                } for user in users]
                return JsonResponse({'users':user_data}, status=status.HTTP_200_OK)
            except Http404 as e:
                return JsonResponse({'error':str(e)}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return JsonResponse({'error':'Search query is missing'}, status=status.HTTP_400_BAD_REQUEST)

def search_companies(request,name):
    if request.method == 'GET':
        if name:
            try:
                companies = get_list_or_404(Companies.objects.filter(
                    slug__istartswith=name
                ).annotate(similarity=F('slug')).order_by('-similarity'))
                companies_data = [{
                    'id': company.company_id,
                    'name': company.company_name,
                    'slug': company.slug,
                    'image': str(company.image)
                } for company in companies]
                return JsonResponse({'companies':companies_data}, status=status.HTTP_200_OK)
            except Http404 as e:
                return JsonResponse({'error':str(e)}, status=status.HTTP_400_BAD_REQUEST)
            
        else:
            return JsonResponse({'error':'Search query is missing'}, status=status.HTTP_400_BAD_REQUEST)
        
def user_info(request, user_id):
    if request.method == 'GET':
        if user_id:
            try:
                base_url = get_base_url(request)
                response = requests.get(base_url+'/backend/api/users/'+str(user_id))
                print(response)    
                if response.status_code == 200:
                    user_data = response.json()
                    user = {
                        'id': user_id,
                        'name':  f"{user_data['firstname']} {user_data['lastname']}",
                        'slug':  user_data['slug'], 'image': user_data['image'],
                        'company': None, 'work_id': None, 'is_admin': None
                    }

                    workOn = get_workson_instance(user_data['user'])
                    print("WORNON AUTH -> ", workOn)
                    if workOn: 
                        user['company'] = workOn['company']
                        user['work_id'] = workOn['id']
                        user['is_admin'] = workOn['is_admin']
                    else:
                        return JsonResponse({
                            'message': str(user_id)+' Success fetch user - No Works Data',
                            'data': user,
                            'status': response.status_code
                        })
                    return JsonResponse({
                        'message': str(user_id)+' Success fetch user + Work Data',
                        'data': user,
                        'status': response.status_code
                    })
                else:
                    return JsonResponse({
                        'message': str(user_id)+ ' Failed fetch user',
                        'data': response.json(),
                        'status': response.status_code
                    })
            except Exception as e:
                return JsonResponse({'error':str(e)}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return JsonResponse({'error':'Error fetching user data'}, status=status.HTTP_400_BAD_REQUEST)
        
def active_friends(request, user_id):
    if request.method == 'GET':
        if user_id:
            base_url = get_base_url(request)
            try:
                response = requests.get(base_url+'/backend/api/active_friends/'+str(user_id))
                print(response.json())
                if response.status_code == 200:
                    return JsonResponse({
                        'message': str(user_id)+' Active Friends fetched Succesfully',
                        'data': response.json(),
                        'status': response.status_code
                    })
                else:
                    return JsonResponse({
                        'message': str(user_id)+' Active Friends fetched Failed',
                        'data': response.json(),
                        'status': response.status_code
                    })
            except Exception as e:
                return JsonResponse({'error':str(e)}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return JsonResponse({'error':'User Id is NULL'}, status=status.HTTP_400_BAD_REQUEST)