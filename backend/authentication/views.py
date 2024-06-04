import json
from django.shortcuts import get_object_or_404, render
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
import requests
from backend.api.serializers import UsersCredentialSerializer, UsersSerializer
from apps.users.models import CustomToken, UsersCredentials,Users
from django.contrib.auth.hashers import check_password
from django.views.decorators.csrf import csrf_exempt
from django.core.serializers import serialize

from backend.util import get_base_url, get_workson_instance

from rest_framework.decorators import api_view
from rest_framework.response import Response

from rest_framework.authtoken.models import Token
from rest_framework import status

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

from django.contrib.auth.hashers import make_password
@api_view(['POST'])
def login(request):
    try:
        user = UsersCredentials.objects.get(email=request.data['email'])
        print(user)
        # user.active = True
        # user.save()
    except UsersCredentials.DoesNotExist:
        return Response({"detail": "Account not found!"}, status=status.HTTP_404_NOT_FOUND)
    
    if not user.check_password(request.data['password']):
        return Response({"detail":"Invalid email or password."}, status=status.HTTP_400_BAD_REQUEST)

    token, created = CustomToken.objects.get_or_create(user=user)

    user_data = get_object_or_404(Users, user=user.user_id)
    ser_user = UsersSerializer(instance=user_data)

    return Response({"token": token.key, "user": ser_user.data}, status=status.HTTP_200_OK)

# @api_view(['POST'])
# def signup(request):
#     serializer = UsersCredentialSerializer(data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#         user = UsersCredentials.objects.get(email=request.data['email'])
#         token, created = CustomToken.objects.get_or_create(user=user)
#         token_data = {'key': token.key}
#         return Response({'token': token_data, 'user': serializer.data})
#     return Response(serializer.errors, status=status.HTTP_200_OK)

@api_view(['POST'])
def signup(request):
    cred_data = {'email': request.data.get('email'),'password': request.data.get('password')}

    serializer_cred = UsersCredentialSerializer(data=cred_data)
    errors = {}

    if serializer_cred.is_valid():
        serializer_cred.save()

        user = UsersCredentials.objects.get(email=request.data['email'])
        user_data = { 'user': user.user_id,
            'firstname': request.data.get('firstname'),   'lastname': request.data.get('lastname'),
            'occupation': request.data.get('occupation'), 'gender': request.data.get('gender'),
            'phone': request.data.get('phone'),           'country': request.data.get('country')
        }

        serializer_user = UsersSerializer(data=user_data)
        if serializer_user.is_valid():
            serializer_user.save()
            token, created = CustomToken.objects.get_or_create(user=user)
            return Response({'token': token.key, 'user': serializer_user.data}, status=status.HTTP_200_OK)
        else:
            errors.update(serializer_user.errors)
            user.delete()
    else:
        errors.update(serializer_cred.errors)

    return Response(errors, status=status.HTTP_400_BAD_REQUEST)

    # if serializer_cred.is_valid() and serializer_user.is_valid():
    #     serializer_cred.save()
    #     serializer_user.save()

    #     user = UsersCredentials.objects.get(email=request.data['email'])
    #     token, created = CustomToken.objects.get_or_create(user=user)
    #     token_data = {'key': token.key}
    #     return Response({'token': token_data, 'user': serializer_user.data}, status=status.HTTP_200_OK)
    # else:
    #     errors = {}
    #     # if not serializer_cred.is_valid(): errors = serializer_cred.errors
    #     # if not serializer_user.is_valid(): errors = serializer_user.errors
    #     if not serializer_cred.is_valid():
    #         for key, value in serializer_cred.errors.items():
    #             if key in errors: errors[key].extend(value)
    #             else: errors[key] = value
    #     if not serializer_user.is_valid():
    #         for key, value in serializer_user.errors.items():
    #             if key in errors: errors[key].extend(value)
    #             else: errors[key] = value
    #     return Response(errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def update_email(request):
    try:
        user = get_object_or_404(UsersCredentials, email=request.data['email'])
    except UsersCredentials.DoesNotExist:
        return Response({"detail": "Account not found!"}, status=status.HTTP_400_BAD_REQUEST)

    # Update email
    user.email = request.data['new_email']
    user.save()

    return Response({"detail": "Email updated successfully."}, status=status.HTTP_200_OK)

@api_view(['POST'])
def update_password(request):
    try:
        user = get_object_or_404(UsersCredentials, email=request.data['email'])
    except UsersCredentials.DoesNotExist:
        return Response({"detail": "Account not found!"}, status=status.HTTP_400_BAD_REQUEST)

    # # Check if the old password matches
    # if not user.check_password(request.data['old_password']):
    #     return Response({"detail": "Incorrect old password."}, status=status.HTTP_400_BAD_REQUEST)

    # Update password
    user.set_password(request.data['new_password'])
    user.save()

    return Response({"detail": "Password updated successfully."}, status=status.HTTP_200_OK)