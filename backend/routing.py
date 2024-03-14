from os import path
from . import consumers

websocket_urlpatters = [
    path("ws/", consumers.TextRoomConsumer.as_asgi()),
]