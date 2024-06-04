import json
from django.http import JsonResponse
import requests
from backend.api.serializers import *
from apps.users.models import *
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
from rest_framework import status
from backend.util import get_base_url, get_workson_instance,verify_token
from rest_framework import status

def staff(request, company):
    if request.method == 'GET':
        if company:
            base_url = get_base_url(request)
            try:
                response = requests.get(base_url+'/backend/api/workson/'+str(company))
                print(response)    
                if response.status_code == 200:
                    return JsonResponse({
                        'message': str(company)+' Employees fetched successfully',
                        'data': response.json(),
                        'status': response.status_code
                    })
                else:
                    return JsonResponse({
                        'message': 'Failed to fethch Employees '+str(company),
                        'data': response.json(),
                        'status': response.status_code
                    })
            except Exception as e:
                return JsonResponse({'error':str(e)}, status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt
def address(request, pk):
    base_url = get_base_url(request)
    if request.method == 'POST':
        token = request.headers.get('Authorization')
        if(verify_token(token)):
            company_id = pk
            data = json.loads(request.body.decode('utf-8'))
            base_url = get_base_url(request)
            try:
                response = requests.post(base_url+'/backend/api/address/0', json=data)
                print(response)
                new_address = response.json()
                new_address_id = new_address.get('id') 
    
                address_instance = Address.objects.get(pk=new_address_id)
                company = Companies.objects.get(pk=company_id)
                company.address = address_instance
                company.save()
    
                if response.status_code == 200:
                    return JsonResponse({'message': 'Address created successfully','data': new_address_id,'status': response.status_code})
                else:
                    return JsonResponse({'message': 'Failed to create address','data': response.json(),'status': response.status_code})
            except Exception as e:
                return JsonResponse({'message': str(e),'data': response.json(),'status': response.status_code})
        else:
            return JsonResponse({'message': 'Unauthorized - Token missing', 'status': status.HTTP_403_FORBIDDEN}) 
    
    elif request.method == 'GET':
        base_url = get_base_url(request)
        try:
            response = requests.get(base_url+'/backend/api/address/'+str(pk))
            print(response.json())
            if response.status_code == 200:
                return JsonResponse({
                    'message': str(pk)+' Address Fetched succesfully',
                    'data': response.json(),
                    'status': response.status_code
                })
            else:
                return JsonResponse({
                    'message': 'Failed to fethch Address '+str(pk),
                    'data': response.json(),
                    'status': response.status_code
                })
        except Exception as e:
            return JsonResponse({'error':str(e)}, status=status.HTTP_400_BAD_REQUEST)



@csrf_exempt
def company(request, company):
    base_url = get_base_url(request)
    if request.method == 'POST':
        token = request.headers.get('Authorization')
        if(verify_token(token)):
            data = json.loads(request.body.decode('utf-8'))
            print(data)
            base_url = get_base_url(request)
            try:
                response = requests.post(base_url+'/backend/api/companies/0', json=data)
                print(response)
    
                if response.status_code == 200:
                    return JsonResponse({'message': 'Company created successfully','data': response.json(), 'status': response.status_code})
                else:
                    return JsonResponse({'message': 'Failed to create Company','data': response.json(), 'status': response.status_code})
            except Exception as e:
                return JsonResponse({'message': str(e),'data': response.json(),'status': response.status_code})
        else:
            return JsonResponse({'message': 'Unauthorized - Token missing', 'status': status.HTTP_403_FORBIDDEN}) 

    elif request.method == 'GET':
        response = requests.get(base_url+'/backend/api/companies/'+str(company))
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
        token = request.headers.get('Authorization')
        if(verify_token(token)):
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
            return JsonResponse({'message': 'Unauthorized - Token missing', 'status': status.HTTP_403_FORBIDDEN}) 

# FOR POST/GET ACTIONS BASED ON WORK_ID 
# for users
@csrf_exempt
def id_workrequests(request, user, company):
    base_url = get_base_url(request)
    if request.method == 'POST':
        token = request.headers.get('Authorization')
        if(verify_token(token)):
            data = json.loads(request.body.decode('utf-8'))   
            try:
                response = requests.post(base_url+'/backend/api/workrequests/0', json=data)
                if response.status_code == 200:
                    result = response.json()
                    if(data.get('is_admin')):
                        set_admin(result.get("id"))
                    status = result.get("status")

                    work = None
                    if( status == 'A'):
                        workOn = get_workson_instance(data.get('user'))
                        print('POST WORK ON', workOn)
                        work = {
                            "company": workOn.get("company"), 
                            "work_id": workOn.get("id"), 
                            "is_admin": workOn.get("is_admin"), 
                        }

                    return JsonResponse({
                        'message': 'Work Request POST succesfully',
                        'work': work,
                        'data': response.json(),
                        'status': response.status_code
                    })
                else:
                    return JsonResponse({
                        'message': 'Failed to POST Work Request',
                        'data': response.json(),
                        'status': response.status_code
                    })
            except Exception as e:
                return JsonResponse({
                    'message': str(e),
                    'data': response.json(),
                    'status': response.status_code
                })
        else:
            return JsonResponse({'message': 'Unauthorized - Token missing', 'status': status.HTTP_403_FORBIDDEN}) 

    elif request.method == 'GET':
        if user and company:
            base_url = get_base_url(request)
            try:
                response = requests.get(base_url+'/backend/api/workrequests/'+str(user)+'/'+str(company))
                if response.status_code == 200:
                    work_inst = response.json()
                    print("work_inst: ", work_inst)
                    work = None
                    if( work_inst.get('status') == 'A'):
                        print("WORK ON INSTANCE EXISTS")
                        workOn = get_workson_instance(user)
                        print('WORK: ',workOn)
                        work = {
                            "company": workOn.get("company"), 
                            "work_id": workOn.get("id"), 
                            "is_admin": workOn.get("is_admin"), 
                        }

                    return JsonResponse({
                        'message': 'Work Requests Fetched succesfully',
                        'work': work,
                        'data': response.json(),
                        'status': response.status_code
                    })  
                else:
                    return JsonResponse({
                        'message': 'Failed to fetch Work Request ',
                        'data': response.json(),
                        'status': response.status_code
                    })
            except Exception as e:
                return JsonResponse({'error':str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
def set_admin( id):
    try:
        print("WORKS_ON SET ADMIN:", id)
        work_on = get_object_or_404(WorksOn, employee=id)
        work_on.is_admin = True  
        work_on.save()
        print("ADMIN:::: ", work_on)
        return JsonResponse({'message': str(id)+' Updated to Admin'}, {'data':work_on},status=200)
    except Exception as e:
        return JsonResponse({'error':str(e)}, status=400)
    