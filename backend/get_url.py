from django.http import HttpRequest


def get_base_url(request: HttpRequest) -> str:
    protocol = 'https' if request.is_secure() else 'http'
    domain = request.get_host()
    base_url = f'{protocol}://{domain}'
    return base_url