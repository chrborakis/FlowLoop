from django.contrib import admin

from apps.companies.models import *


admin.site.register(Companies)
admin.site.register(CompaniesAdmins)
admin.site.register(WorksOn)