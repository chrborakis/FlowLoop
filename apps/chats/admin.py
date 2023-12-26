from django.contrib import admin
from apps.chats.models import PrivateChat

class PrivateChatAdmin(admin.ModelAdmin):
    list_display = ('sender', 'receiver', 'send_date', 'message')
    list_display_links = ('sender', 'receiver', 'send_date', 'message')
    list_filter = ('sender', 'receiver') 

    def get_ordering(self, request):
        return ('sender', 'receiver', '-send_date') 

admin.site.register(PrivateChat, PrivateChatAdmin)
