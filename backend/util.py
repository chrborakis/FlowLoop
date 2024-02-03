from django.http import HttpRequest
from django.shortcuts import get_object_or_404
from apps.companies.models import WorksOn
from backend.api.serializers import WorksOnSerializer

def get_base_url(request: HttpRequest) -> str:
    protocol = 'https' if request.is_secure() else 'http'
    domain = request.get_host()
    base_url = f'{protocol}://{domain}'
    return base_url


def get_workson_instance(user_id):
    instance = get_object_or_404(WorksOn, employee__user_id__user_id=user_id)
    serializer = WorksOnSerializer(instance)

    return serializer.data