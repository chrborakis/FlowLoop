from django.contrib import admin

from apps.users.models import *


admin.site.register(UsersCredentials)
admin.site.register(Users)

admin.site.register(UniversityDetails)
admin.site.register(EducationDetails)