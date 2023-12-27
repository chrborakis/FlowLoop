from django.contrib import admin

from apps.groups.models import *

class GroupsAdmin(admin.ModelAdmin):
    list_display = ('company', 'name')
    list_display_links = ('company', 'name')
    list_filter = ('company',) 

class GroupMembersAdmin(admin.ModelAdmin):
    list_display = ('group', 'member')
    list_display_links = ('group', 'member')
    list_filter = ('group',) 

class GroupAdminsAdmin(admin.ModelAdmin):
    list_display = ('group', 'admin')
    list_display_links = ('group', 'admin')
    list_filter = ('group',) 

class GroupChatAdmin(admin.ModelAdmin):
    list_display = ('group', 'send_date', 'sender', 'message')
    list_display_links = ('group', 'send_date', 'sender', 'message')
    list_filter = ('group',) 

    def get_ordering(self, request):
        return ('group', '-send_date') 


admin.site.register(Groups, GroupsAdmin)
admin.site.register(GroupMembers, GroupMembersAdmin)
admin.site.register(GroupAdmins, GroupAdminsAdmin)
admin.site.register(GroupChat, GroupChatAdmin)