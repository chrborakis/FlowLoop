import json
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync

class GroupChatConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()

        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = f"group_chat_{self.room_name}"
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
                'type':'chat_message',
                'message':message
            }
        )

    def chat_message(self,event):
        print("group_chat_message: ", self.room_group_name)
        message = event['message']
        self.send(text_data=json.dumps({
            'type':'chat',
            'message': message
        }))