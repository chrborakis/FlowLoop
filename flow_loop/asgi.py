import os
import django
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
# from backend.ws.routing import websocket_urlpatterns

from backend import routing

os.environ.setdefault('DJANGO_SETTINGS_MODULE','flow_loop.settings')
django.setup()

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": AuthMiddlewareStack(
        URLRouter(
            routing.websocket_urlpatters
        )
    )
})