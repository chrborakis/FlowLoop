import json
from django.http import JsonResponse
import requests
from backend.api.serializers import *
from apps.users.models import *
from django.views.decorators.csrf import csrf_exempt
from django.core.paginator import Paginator
from backend.util import get_base_url
from rest_framework import status

@csrf_exempt
def projects(request, company):
    print("PROJECTS: ",company)
    if request.method == 'GET':
        try:
            queryset = Projects.objects.filter(company=company)
            paginator = Paginator(queryset, 5)  #items per scroll down
            page_number = request.GET.get('page')
            page_number = int(page_number) if page_number else 1
            page_obj = paginator.get_page(page_number)
            next_page_number = page_number + 1 if page_obj.has_next() else None
            serializer = ProjectsSerializer(page_obj, many=True)
            print("serializer: ", serializer)
            return JsonResponse({
                'message': 'Projects Fetched succesfully',
                'data': serializer.data, 
                'has_next': next_page_number,
                'status': 200
            })
        except Exception as e:
            print("ERROR: ", str(e))
            return JsonResponse({
                'message': 'Projects Fetch Failed',
                'error': str(e),
                'status': 500
            })
        
def divisions(request,project):
    print("company: ", project)
    if request.method == 'GET':
        if project:
            base_url = get_base_url(request)
            try:
                response = requests.get(base_url+'/backend/api/project_divisions/'+str(project))
                print(response)    
                if response.status_code == 200:
                    return JsonResponse({
                        'message': str(project)+' divisions fetched successfully',
                        'data': response.json(),
                        'status': response.status_code
                    })
                else:
                    return JsonResponse({
                        'message': 'Failed to fetch divisions '+str(project),
                        'data': response.json(),
                        'status': response.status_code
                    })
            except Exception as e:
                return JsonResponse({'error':str(e)}, status=status.HTTP_400_BAD_REQUEST)