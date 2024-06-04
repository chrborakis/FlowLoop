from django.http import HttpRequest, JsonResponse
from django.shortcuts import get_object_or_404
from apps.companies.models import WorksOn
from backend.api.serializers import WorksOnSerializer

from rest_framework.exceptions import AuthenticationFailed
from apps.users.models import CustomToken 

def verify_token(token):
    print(token)
    if not token: raise AuthenticationFailed('Token is missing')
    try:
        instance = CustomToken.objects.get(key=token)
        return True
    except CustomToken.DoesNotExist:
        raise AuthenticationFailed('Invalid token')


def get_base_url(request: HttpRequest) -> str:
    protocol = 'https' if request.is_secure() else 'http'
    domain = request.get_host()
    base_url = f'{protocol}://{domain}'
    return base_url


def get_workson_instance(user_id):
    try:
        instance = get_object_or_404(WorksOn, employee__user_id__user_id=user_id)
        serializer = WorksOnSerializer(instance)
            
        return serializer.data 
    
    except Exception as err:
        return None