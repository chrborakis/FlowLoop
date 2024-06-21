from django.urls import re_path

from backend.chat.consumers import ChatConsumer, ChatNotificationConsumer
from backend.groups.consumers import GroupChatConsumer
from backend.users.consumers import NotificationConsumer

websocket_urlpatterns = [
    re_path(r'^ws/chat/(?P<room_name>[^/]+)/$', ChatConsumer.as_asgi()),
    re_path(r'^ws/group_chat/(?P<room_name>[^/]+)/$', GroupChatConsumer.as_asgi()),
    re_path(r'^ws/chat_unread/(?P<room_name>[^/]+)/$', ChatNotificationConsumer.as_asgi()),
    re_path(r'^ws/notifications/(?P<room_name>[^/]+)/$', NotificationConsumer.as_asgi()),
]