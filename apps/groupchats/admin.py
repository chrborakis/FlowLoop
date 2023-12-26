from django.contrib import admin

from apps.groupchats.models import *

class GroupChatConversationAdmin(admin.ModelAdmin):
    list_display = ('group', 'send_date', 'sender', 'message')
    list_display_links = ('group', 'send_date', 'sender', 'message')
    list_filter = ('group',)  # Add a filter for grouping by 'group'

    def get_ordering(self, request):
        return ('group', '-send_date')  # Sorting by 'group' (ascending) and 'send_date' (descending)



admin.site.register(GroupChats)
admin.site.register(GroupChatMembers)
admin.site.register(GroupChatsAdmins)
admin.site.register(GroupChatConversation, GroupChatConversationAdmin)