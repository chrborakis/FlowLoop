from django.shortcuts import render
from django.contrib.auth import authenticate, login
from django.http import HttpResponse, JsonResponse
from apps.users.models import UsersCredentials
from django.contrib.auth.hashers import check_password

def login_view(request):
    if request is None:
        print("Request is None")
        return HttpResponse("Request is None")
    else:
        print('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~WORK~~~~~~~~~~~~~~~~~~~~~~~~')
        if request.method == 'POST':
            request_data = request.POST
            return HttpResponse(request_data)
            # email    = request.POST.get('email')
            # password = request.POST.get('password')
            # print(email,password)
        # return HttpResponse(email,password)
        #     try:
        #         user = UsersCredentials.objects.get(email=email)
        #         password_matches = check_password(password, user.password)

        #         if password_matches:
        #             print("Authentication successful for user:", user.email)
        #             login(request, user)
        #             return JsonResponse({'message': 'Login Successful'})
        #         else:
        #             print("Invalid password for user:", user.email)
        #             return JsonResponse({'message': 'Invalid credentials'}, status=401)

        #     except UsersCredentials.DoesNotExist:
        #         print("Account not found!")            
            
        # return JsonResponse({'message': 'Method not allowed'}, status=405)