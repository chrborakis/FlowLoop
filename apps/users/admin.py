from django.contrib import admin

from apps.users.models import *

class UsersAdmin(admin.ModelAdmin):
    # def project(self, obj): return obj.division.project
    # def company(self, obj): return obj.division.project.company

    list_display = ('firstname','lastname', 'gender','occupation','phone','country','about')
    list_display_links = ('firstname','lastname', 'gender','occupation','phone','country','about')
    list_filter = ('country','occupation')
    list_ordering = ('lastname', 'firstname')

class FriendRequestsAdmin(admin.ModelAdmin):
    # def project(self, obj): return obj.division.project
    # def company(self, obj): return obj.division.project.company

    list_display = ('user1','request', 'status')
    list_display_links = ('user1','request', 'status')
    list_filter = ('user1','status')

class FriendsAdmin(admin.ModelAdmin):
    list_display = ('person','friend')
    list_display_links = ('person','friend')
    list_filter = ('person',)


admin.site.register(UsersCredentials)
admin.site.register(Users,UsersAdmin)

admin.site.register(FriendRequests,FriendRequestsAdmin)
admin.site.register(Friends,FriendsAdmin)

admin.site.register(UniversityDetails)
admin.site.register(EducationDetails)