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
def projects(request, id):
    if request.method == 'GET':
        company = id
        try:
            queryset = Projects.objects.filter(company=company).order_by('-project_id')
            paginator = Paginator(queryset, 10)  #items per scroll down
            page_number = request.GET.get('page')
            page_number = int(request.GET.get('page')) if page_number else 1
            page_obj = paginator.get_page(page_number)
            next_page_number = page_number + 1 if page_obj.has_next() else None
            serializer = ProjectsSerializer(page_obj, many=True)

            return JsonResponse({ 'message': 'Projects Fetched succesfully', 'data': serializer.data,  'has_next': next_page_number, 'status': 200})
        except Exception as e: return JsonResponse({'message': 'Projects Fetch Failed','error': str(e),'status': 500})
    
    elif request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        print( data)
        base_url = get_base_url(request)
        try:                                   
            response = requests.post(base_url+'/backend/api/projects/'+str(data["company"]), json=data)
            if response.status_code == 200:
                  return JsonResponse({
                    'message': '[POST] New Project created successfully',
                    'data': response.json(), 
                    'status': response.status_code
                })
            else: 
                return JsonResponse({
                    'message': '[POST] Failed to create New Project',
                    'data': response.json(),'status': response.status_code
                })
        except Exception as e:
            print( e)
            return JsonResponse({'message': str(e),'data': response.json(),'status': response.status_code})
    
    elif request.method == 'PATCH':
        data = json.loads(request.body.decode('utf-8'))
        print( data)
        base_url = get_base_url(request)
        try:
            response = requests.patch(base_url+'/backend/api/projects/'+str(id), json=data)
            print(response)
           
            if response.status_code == 200:
                return JsonResponse({
                    'message': '[POST]Project '+str(id)+' updated successfully',
                    'data':  response.json() ,
                    'status': response.status_code
                })
            else:
                return JsonResponse({
                    'message': '[POST]Project '+str(id)+' updat failed',
                    'data':  response.json() ,
                    'status': response.status_code
                })
        except Exception as e:
            print(e)
            return JsonResponse({
                'message': str(e),
                'data': response.json(),
                'status': response.status_code
            })

    elif request.method == 'DELETE':
        try:
            project_id = id
            item = Projects.objects.get(project_id=project_id)
            item.delete()
            return JsonResponse({'message': '[DEL]Project '+str(project_id)+' deleted','status': 200})
        except ProjectAssign.DoesNotExist:return JsonResponse({'message': 'Project '+str(project_id)+' not found','status': 404})
        except Exception as e: return JsonResponse({'message': str(e),'status': 500})
        
@csrf_exempt
def divisions(request,id):
    print("company: ", id)
    if request.method == 'GET':
        if id:
            base_url = get_base_url(request)
            try:
                response = requests.get(base_url+'/backend/api/project_divisions/'+str(id))
                print(response)    
                if response.status_code == 200:
                    return JsonResponse({
                        'message': str(id)+' divisions fetched successfully',
                        'data': response.json(),
                        'status': response.status_code
                    })
                else:
                    return JsonResponse({
                        'message': 'Failed to fetch divisions '+str(id),
                        'data': response.json(),
                        'status': response.status_code
                    })
            except Exception as e:
                return JsonResponse({'error':str(e)}, status=status.HTTP_400_BAD_REQUEST)
           
    elif request.method == 'POST':
        print("project: ", id)
        data = json.loads(request.body.decode('utf-8'))
        print(data)
        base_url = get_base_url(request)
        try:
            response = requests.post(base_url+'/backend/api/project_divisions/'+str(id), json=data)
            print(response)
            new_division = response.json() 
            if response.status_code == 200:
                return JsonResponse({
                    'message': '[POST]New Division created successfully',
                    'data': new_division,
                    'status': response.status_code
                })
            else:
                return JsonResponse({
                    'message': '[POST]Failed to create New Division',
                    'data': response.json(),
                    'status': response.status_code
                })
        except Exception as e:
            return JsonResponse({
                'message': str(e),
                'data': response.json(),
                'status': response.status_code
            })
        
@csrf_exempt
def assign(request, division):
    if request.method == 'POST':
        work_on = json.loads(request.body.decode('utf-8'))
        base_url = get_base_url(request)
        data = {'division': division,'assign':  work_on}
        print(data)
        try:
            response = requests.post(base_url+'/backend/api/project_assign/'+str(division), json=data)
            print(response)
            assign = response.json() 
            if response.status_code == 200:
                return JsonResponse({
                    'message': '[POST]Project Assign successfully ' +assign,
                    'data': assign,
                    'status': response.status_code
                })
            else:
                return JsonResponse({
                    'message': '[POST]Failed to create New Assign',
                    'data': assign,
                    'status': response.status_code
                })
        except Exception as e:
            return JsonResponse({
                'message': str(e),
                'data': response.json(),
                'status': response.status_code
            })
    elif request.method == 'DELETE':
        try:
            participant_id = division
            print("participant_id",participant_id)
            item = ProjectAssign.objects.get(participant_id=participant_id)
            item.delete()
            return JsonResponse({
                'message': '[DEL]Project Assign deleted',
                'status': 200
            })
        except ProjectAssign.DoesNotExist:
            return JsonResponse({
                'message': 'Project Assign not found',
                'status': 404
            })
        except Exception as e:
            return JsonResponse({
                'message': str(e),
                'status': 500
            })
        
@csrf_exempt
def admin(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        print(data)
        base_url = get_base_url(request)
        try:
            response = requests.post(base_url+'/backend/api/project_admins/0', json=data)
            print(response)
            if response.status_code == 200:
                return JsonResponse({
                    'message': '[POST]New Project admin created successfully',
                    'data': response.json() ,
                    'status': response.status_code
                })
            else:
                return JsonResponse({
                    'message': '[POST]Failed to create New Project admin',
                    'data': response.json(),
                    'status': response.status_code
                })
        except Exception as e:
            return JsonResponse({
                'message': str(e),
                'data': response.json(),
                'status': response.status_code
            })