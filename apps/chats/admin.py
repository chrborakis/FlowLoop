from django.contrib import admin
from apps.chats.models import PrivateChat

class PrivateChatAdmin(admin.ModelAdmin):
    def _sender(self, obj):   return obj.sender.person
    def _receiver(self, obj): return obj.receiver.person

    list_display       = ('_sender', '_receiver', 'send_date', 'message')
    list_display_links = ('_sender', '_receiver', 'send_date', 'message')
    list_filter = ('sender__person', 'receiver__person') 
        
    def get_queryset(self, request):
        qs = super().get_queryset(request)
        qs = qs.order_by('send_date','sender', 'receiver')
        return qs


    def message_pair(self, obj):
        return f'{obj.sender} to {obj.receiver}'


admin.site.register(PrivateChat, PrivateChatAdmin)