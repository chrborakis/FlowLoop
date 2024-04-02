from datetime import datetime
from dateutil.parser import parse
import json
from django.db.models import F
from django.views.decorators.csrf import requires_csrf_token
from django.http import Http404, HttpResponse, JsonResponse
import requests
from rest_framework.views import APIView
from backend.api.serializers import *
from apps.users.models import *
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import action
from django.core.paginator import Paginator
from backend.util import get_base_url, get_workson_instance
from django.shortcuts import get_list_or_404

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


         


