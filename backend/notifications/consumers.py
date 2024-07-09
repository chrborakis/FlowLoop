import json
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync

class NotificationConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()

        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = f"notification_{self.room_name}"
        print("ROOM NAME: ", self.room_group_name)
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )

    def receive(self, text_data):
        print("receive: ", self.room_group_name)
        text_data_json = json.loads(text_data)
        message = text_data_json['message']

        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,{
                'type':'notification',
                'message':message
            }
        )

    def notification(self, event):
        message = event['message']
        print("send_notification: ", message)
        self.send(text_data=json.dumps({
            'type': 'notification',
            'message': message
        }))

    
class ChatNotificationConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()

        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = f"chat_{self.room_name}"
        print("ROOM NAME: ", self.room_group_name)
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )

    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']

        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,{
                'type':'chat_notification',
                'message':message
            }
        )

    def chat_notification(self, event):
        message = event['message']
        self.send(text_data=json.dumps({
            'type': 'chat_notification',
            'message': message
        }))

class RequestsNotificationConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()

        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = f"chat_{self.room_name}"
        print("ROOM NAME: ", self.room_group_name)
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )

    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']

        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,{
                'type':'requests',
                'message':message
            }
        )

    def requests(self, event):
        message = event['message']
        self.send(text_data=json.dumps({
            'type': 'requests',
            'message': message
        }))