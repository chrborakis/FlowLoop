import json
from django.shortcuts import render
from django.contrib.auth import authenticate, login
from django.http import HttpResponse, JsonResponse
from apps.users.models import UsersCredentials,Users
from django.contrib.auth.hashers import check_password
from django.views.decorators.csrf import csrf_exempt
from django.core.serializers import serialize

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
                # login(request, user)  //ERROR
                try:
                    # json_data = serialize('json', [Users.objects.get(user=user)])
                    user_data = Users.objects.values().get(user=user)
                    user_dict = {key: str(value) for key, value in user_data.items()}
                    
                    return JsonResponse({
                        'message': 'Login Successful',
                        'user': user_dict,
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