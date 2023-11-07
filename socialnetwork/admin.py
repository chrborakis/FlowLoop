from django.contrib import admin
from .models import *

admin.site.register(UsersCredentials)
admin.site.register(Users)

admin.site.register(Companies)
admin.site.register(CompaniesAdmins)
admin.site.register(WorksOn)

admin.site.register(Phone)
admin.site.register(Address)
admin.site.register(UniversityDetails)
admin.site.register(EducationDetails)

# admin.site.register(Posts)