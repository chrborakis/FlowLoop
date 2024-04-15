import cgi
import json
from django.http import JsonResponse
import requests
from backend.api.serializers import *
from apps.users.models import *
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
from rest_framework import status
from backend.util import get_base_url, get_workson_instance
from PIL import Image
from io import BytesIO
from urllib.parse import urljoin
from django.conf import settings

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
    elif request.method == 'GET':
        response = requests.get(base_url+'/backend/api/companies/'+str(company))
        print(response.json())
        return JsonResponse({
            'message': 'Company Fetched succesfully',
            'data': response.json(),
            'status': response.status_code
        })
    
    elif request.method == 'PUT':
        print(request.FILES)
        
        print(request.FILES.get('data'))
        print(request.FILES.get('image'))
        print(request.FILES.get('data[image]'))

        return JsonResponse({})
        # data = request.FILES.get('data[image]')
        # if 'image' in data:
        #     new_image = data['image']
        #     print("image",new_image)
        # else:
        #     print("No file uploaded.")
        # new_image = None
        # image = Image.open(new_image)
        # resized_image = image.resize((150, 150))
        # output_io = BytesIO()
        # resized_image.save(output_io, format='JPEG') 

        # try:
        #     company = Companies.objects.get(company_id=company)
        #     company.image.save(new_image.name, output_io, save=False)
        #     company.save()
        #     updated_image_url = urljoin(settings.MEDIA_URL, company.image.url)
        #     return JsonResponse({'message': 'Image updated successfully', 'data': updated_image_url}, status=200)

        # except Exception as e:
        #     print(e)
        #     return JsonResponse({'message': 'Image updated successfully', 
        #         'error': str(e),
        #         'status':200}
        #     )


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
    