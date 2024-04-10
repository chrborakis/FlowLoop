import json
from django.http import JsonResponse
import requests
from backend.api.serializers import *
from apps.users.models import *
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
from rest_framework import status
from backend.util import get_base_url, get_workson_instance

# Create your views here.
def staff(request, company):
    print("company: ", company)
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
        data = json.loads(request.body.decode('utf-8'))
        print(data.get("address"))
        base_url = get_base_url(request)
        try:
            response = requests.post(base_url+'/backend/api/address/0', json=data.get("address"))
            print(response)
            new_address = response.json()
            new_address_id = new_address.get('id') 
 
            if response.status_code == 200:
                return JsonResponse({
                    'message': 'Address created successfully',
                    'data': new_address_id,
                    'status': response.status_code
                })
            else:
                return JsonResponse({
                    'message': 'Failed to create address',
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
        response = requests.get(base_url+'/backend/api/address/'+str(pk))
        print(response.json())
        return JsonResponse({
            'message': 'Address Fetched succesfully',
            'data': response.json(),
            'status': response.status_code
    })


@csrf_exempt
def company(request, company):
    base_url = get_base_url(request)
    if request.method == 'POST':
        data = {
            'company_name':       request.POST.get('data[company_name]'),
            'establishment_date': request.POST.get('data[date]'),
            'description':        request.POST.get('data[description]'),
            # 'image':              request.FILES.get('data[image]').name,
            'phone':              request.POST.get('data[phone]'),
            'address' :           int(request.POST.get('address'))
        }
        print("Company: ", data)

        base_url = get_base_url(request)
        try:
            new_inst = Companies.objects.create(
                company_name =       data['company_name'],
                establishment_date = data['establishment_date'],
                description =        data['description'],
                phone =              data['phone'],
                address =            Address.objects.get(pk=data['address']),
                image =              request.FILES.get('data[image]')
            )
            print("NEW INST", new_inst)
            new_inst.save()
            response = requests.get(base_url+'/backend/api/companies/'+str(new_inst.slug))
            # response = requests.post(base_url+'/backend/api/companies/0', json=data)
            print(response)
            new_company = response.json()

            if response.status_code == 200:
                return JsonResponse({
                    'message': 'Company created successfully',
                    'data': new_company.get('company_id'),
                    'status': response.status_code
                })
            else:
                instance = get_object_or_404(Address, pk=data['address'])
                instance.delete()
                return JsonResponse({
                    'message': 'Failed to create Company',
                    'data': response.json(),
                    'status': response.status_code
                })
        except Exception as e:
            instance = get_object_or_404(Address, pk=data['address'])
            instance.delete()
            return JsonResponse({
                'message': str(e),
                'data': response.json(),
                'status': response.status_code
            })
    if request.method == 'GET':
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
        return JsonResponse({'error': '[WORKREQ]Invalid request method'})
    
# FOR POST/GET ACTIONS BASED ON WORK_ID 
# for users
@csrf_exempt
def id_workrequests(request, user, company):
    base_url = get_base_url(request)
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))   
        try:
            response = requests.post(base_url+'/backend/api/workrequests/0', json=data)
            if response.status_code == 200:
                result = response.json()
                status = result.get("status")
                work = None
                print("USER: ", data.get("user"))
                if( status == 'A'):
                    print("WORK ON INSTANCE EXISTS")
                    workOn = get_workson_instance(data.get('user'))
                    print("workOn: ", workOn)
                    work = {"company": workOn.data["company"], "work_id": workOn.data["id"]}
                return JsonResponse({
                    'message': 'Work Request POST succesfully',
                    'work': work,
                    'data': response.json(),
                    'status': response.status_code
                })
            else:
                instance = get_object_or_404(Address, pk=address)
                instance.delete()
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

    elif request.method == 'GET':
        if user and company:
            base_url = get_base_url(request)
            try:
                print("before api")
                response = requests.get(base_url+'/backend/api/workrequests/'+str(user)+'/'+str(company))
                print("after api")
                if response.status_code == 200:
                    work_inst = response.json()
                    print(work_inst)
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
           