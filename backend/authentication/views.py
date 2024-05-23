import json
from django.shortcuts import get_object_or_404, render
from django.contrib.auth import authenticate, login
from django.http import HttpRequest, HttpResponse, JsonResponse
import requests
from apps.users.models import UsersCredentials,Users
from apps.companies.models import WorksOn, WorkRequests
from django.contrib.auth.hashers import check_password
from django.views.decorators.csrf import csrf_exempt
from django.core.serializers import serialize
from backend.api.serializers import WorksOnSerializer

from backend.util import get_base_url, get_workson_instance


@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        email    = data.get('formData').get('email')
        password = data.get('formData').get('password')
        try:
            user = UsersCredentials.objects.get(email=email)
            password_matches = check_password(password, user.password)
            print(user, password, user.password, password_matches)
            if password_matches:
                print("Authentication successful for user:", user.email)
                # login(request, user)  //ERROR
                try:
                    fields_to_select = ['user','firstname', 'lastname', 'image', 'slug']
                    user_data = Users.objects.values(*fields_to_select).get(user=user)
                    user_dict = {key: str(value) for key, value in user_data.items()}

                    user1 = {
                        'id': user.user_id,
                        'name':  f"{user_dict['firstname']} {user_dict['lastname']}",
                        'slug':  user_dict['slug'],
                        'image': user_dict['image'],
                        #   or '/profile/user/dummy-user.png',
                        'company': None,'work_id': None,'is_admin': None
                    }

                    user.active = True
                    user.save()

                    try:
                        workOn = get_workson_instance(user_dict['user'])

                        user1['company'] = workOn['company']
                        user1['work_id'] = workOn['id']
                        user1['is_admin'] = workOn['is_admin']
                    except:
                        return JsonResponse({'message': 'Login Successful','user': json.dumps(user1),'authenticated': True})
                    return JsonResponse({'message': 'Login Successful','user': json.dumps(user1),'authenticated': True})
                except:
                    return JsonResponse({'message': 'User Data not Found'})
            else:
                print("Invalid password for user:", user.email, password)
                return JsonResponse({
                    'password': True,
                    'message': 'Invalid credentials'
                })

        except UsersCredentials.DoesNotExist:
            print("Account not found!")            
            return JsonResponse({
                'account': True,
                'message': 'Account not found!'
            })
    return JsonResponse({'error': 'Only POST requests are allowed'})

@csrf_exempt
def register_view(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        user_credentials = {
            "email":    data.get('formData').get('email'),
            "password": data.get('formData').get('password')
        }

        print(user_credentials)
        base_url = get_base_url(request)
        try:
            response_cred = requests.post(base_url+'/backend/api/userscredential', json=user_credentials)
            if response_cred.status_code == 200:
                user_cred_data = response_cred.json()
                print("userscredential Response data:", user_cred_data)

                user = {
                    "user":    user_cred_data['user_id'],
                    "firstname":  data.get('formData').get('firstname'),
                    "lastname":   data.get('formData').get('lastname'),
                    "occupation": data.get('formData').get('occupation'),
                    "gender":     data.get('formData').get('gender'),
                    "country":    data.get('formData').get('country'),
                    "phone":      data.get('formData').get('phone'),
                }

                try:
                    response_user = requests.post(base_url+'/backend/api/users', json=user)
                    user_data = response_user.json()
                    print("Response data:", user_data)

                    user1 = {
                        'id': user_data['user'],
                        'name':  f"{user_data['firstname']} {user_data['lastname']}",
                        'slug':  user_data['slug'],'image': user_data['image'],
                        'company': None,'work_id': None
                    }

                    return JsonResponse({
                        'message': 'Register Successful',
                        'user': json.dumps(user1),
                        'authenticated': True,
                        'status': response_user.status_code
                    })

                except Exception as e:
                    # If user creation fails, delete the corresponding user credentials
                    print("ERROR USER")
                    instance = UsersCredentials.objects.get(pk=str(user_cred_data['user_id'])) 
                    instance.delete()
                    return JsonResponse({
                        'message': "User Register failed!",
                        'error': response_user.json(),
                        'authenticated': False,
                        'status': response_user.status_code
                    })
            
            else:   # If user credent fails
                print(" User Cref Fails: ",response_cred.json())
                return JsonResponse({'error': response_cred.json()})
        except:
            return JsonResponse({'message': 'Error creating user credentials'})