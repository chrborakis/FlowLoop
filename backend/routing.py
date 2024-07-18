from django.urls import re_path

from backend.chat.consumers import ChatConsumer
from backend.groups.consumers import GroupChatConsumer
from backend.notifications.consumers import NotificationConsumer, ChatNotificationConsumer, RequestsNotificationConsumer

websocket_urlpatterns = [
    re_path(r'^ws/chat/(?P<room_name>[^/]+)/$',          ChatConsumer.as_asgi()),
    re_path(r'^ws/group_chat/(?P<room_name>[^/]+)/$',    GroupChatConsumer.as_asgi()),
    re_path(r'^ws/notifications/(?P<room_name>[^/]+)/$', NotificationConsumer.as_asgi()),
    re_path(r'^ws/chat_unread/(?P<room_name>[^/]+)/$',   ChatNotificationConsumer.as_asgi()),
    re_path(r'^ws/requests/(?P<room_name>[^/]+)/$',      RequestsNotificationConsumer.as_asgi()),
]

