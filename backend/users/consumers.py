import json
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync

class NotificationConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()

        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = f"chat_{self.room_name}"
        self.message_count = 0  # Initialize the counter

        print("Notification ROOM NAME: ", self.room_group_name)

        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )

    def receive(self, text_data):
        print("receive: ", self.room_group_name)
        text_data_json = json.loads(text_data)
        message = text_data_json.get('message', '')
        print("receive: ", message)

        # Increment the counter
        self.message_count += 1

        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,{
                'type':'chat_message',
                'message': message,
                'message_count': self.message_count  # Send the counter value
            }
        )

    def chat_message(self, event):
        message = event['message']
        message_count = event.get('message_count', 0)
        print("receive: ", message_count)

        self.send(text_data=json.dumps({
            'type': 'chat',
            'message': message,
            'message_count': message_count  # Include the counter value in the response
        }))