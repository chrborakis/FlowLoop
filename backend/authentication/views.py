import json
from django.shortcuts import get_object_or_404, render
from django.contrib.auth import authenticate, login
from django.http import HttpResponse, JsonResponse
import requests
from apps.users.models import UsersCredentials,Users
from apps.companies.models import WorksOn, WorkRequests
from django.contrib.auth.hashers import check_password
from django.views.decorators.csrf import csrf_exempt
from django.core.serializers import serialize

from backend.api.serializers import WorksOnSerializer

@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        email = data.get('email')
        password = data.get('password')
        print(email,password)
        try:
            user = UsersCredentials.objects.get(email=email)
            password_matches = check_password(password, user.password)

            if password_matches:
                print("Authentication successful for user:", user.email)
                # login(request, user) 
                try:
                    fields_to_select = ['user','firstname', 'lastname', 'image', 'slug']
                    user_data = Users.objects.values(*fields_to_select).get(user=user)
                    user_dict = {key: str(value) for key, value in user_data.items()}
                    name = f"{user_dict['firstname']} {user_dict['lastname']}"

                    try:
                        instance = get_object_or_404(WorksOn, employee__user_id__user_id=user_dict['user'])
                        serializers = WorksOnSerializer(instance)
                        
                        user1 = {
                        'id': user.user_id,
                        'name':  name,
                        'slug':  user_dict['slug'],
                        'image': user_dict['image'],
                        'company': serializers.data['company'],
                        'work_id': serializers.data['id']
                    }
                    except:
                        user1 = {
                            'id': user.user_id,
                            'name':  name,
                            'slug':  user_dict['slug'],
                            'image': user_dict['image'],
                            'company': serializers.data['company'],
                        }

                    return JsonResponse({
                        'message': 'Login Successful',
                        'user': json.dumps(user1),
                        'authenticated': True
                    })
                except:
                    return JsonResponse({'message': 'User Data not Found'})
            else:
                print("Invalid password for user:", user.email)
                return JsonResponse({'message': 'Invalid credentials'})

        except UsersCredentials.DoesNotExist:
            print("Account not found!")            
            return JsonResponse({'message': 'Account not found!'})
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
        try:
            response_cred = requests.post('/api/userscredential', json=user_credentials)
            print('ok')
            print("userscredential status: ", response_cred.status_code)
            user_cred_data = response_cred.json()
            print("Response data:", user_cred_data)

            if response_cred.status_code == 200:
                user = {
                    "user":       user_cred_data.user_id,
                    "firstname":  data.get('formData').get('firstname'),
                    "lastname":   data.get('formData').get('lastname'),
                    "occupation": data.get('formData').get('occupation'),
                    "gender":     data.get('formData').get('gender'),
                    "phone":      data.get('formData').get('phone'),
                    "country":    data.get('formData').get('country'),
                }

                response_user = requests.post('../api/users', json=user)
                
                print("users status: ", response_user.status_code)
                user_data = response_user.json()
                print("Response data:", user_data)
                
                

        except:
            return JsonResponse({'message': 'Error creating user credentials'})

        

        

        return JsonResponse({'message': 'Valid credentials'})