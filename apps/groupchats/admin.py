from django.contrib import admin

from apps.groupchats.models import *


admin.site.register(GroupChats)
admin.site.register(GroupChatMembers)
admin.site.register(GroupChatsAdmins)
