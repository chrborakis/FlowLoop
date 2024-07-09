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

    list_display = ('sender','receiver', 'status')
    list_display_links = ('sender','receiver', 'status')
    list_filter = ('sender','status')

class FriendsAdmin(admin.ModelAdmin):
    list_display = ('person','friend')
    list_display_links = ('person','friend')
    list_filter = ('person',)

class UsersCredentialsAdmin(admin.ModelAdmin):
    list_display = ('email','password')
    list_ordering = ('-user_id')

class EducationDetailsAdmin(admin.ModelAdmin):
    list_display = ('user','name', 'graduation')
    list_display_links = ('user','name', 'graduation')
    list_filter = ('user','name',)

class UniversityDetailsAdmin(admin.ModelAdmin):
    list_display = ('user','name', 'graduation', 'degree')
    list_display_links = ('user','name', 'graduation', 'degree')
    list_filter = ('user','name', 'degree')

admin.site.register(UsersCredentials,UsersCredentialsAdmin)
admin.site.register(Users,UsersAdmin)

admin.site.register(FriendRequests,FriendRequestsAdmin)
admin.site.register(Friends,FriendsAdmin)

admin.site.register(UniversityDetails,UniversityDetailsAdmin)
admin.site.register(EducationDetails,EducationDetailsAdmin)

admin.site.register(CustomToken)


class NotificationsAdmin(admin.ModelAdmin):
    list_filter = ('user', 'is_read')
admin.site.register(Notifications, NotificationsAdmin)