import json
from django.shortcuts import get_object_or_404, render
from django.contrib.auth import authenticate, login
from django.http import HttpResponse, JsonResponse
from apps.users.models import UsersCredentials,Users
from apps.companies.models import WorksOn, WorkRequests
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
                    fields_to_select = ['user','firstname', 'lastname', 'image', 'slug']
                    user_data = Users.objects.values(*fields_to_select).get(user=user)
                    user_dict = {key: str(value) for key, value in user_data.items()}
                    
                    work_requests = WorkRequests.objects.values().get(user=user_dict['user'], status='A')
                    work_dict = {key: str(value) for key, value in work_requests.items()}

                    # print(work_requests)
                    # json_data = serialize('json', work_requests)
                    # data_list = json.loads(json_data)

                    # first_item = data_list[0]
                    # print(first_item['fields']['company'])
                    # work_dict = {key: str(value) for key, value in work_requests.items()}
                    # print(work_dict['company'])

   

                    name = f"{user_dict['firstname']} {user_dict['lastname']}"
                    user1 = {
                        'name':  name,
                        'slug':  user_dict['slug'],
                        'image': user_dict['image'],
                        'company': work_dict['company_id']
                    }

                    return JsonResponse({
                        'message': 'Login Successful',
                        'user_id': user.user_id,
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