from django.contrib import admin

from apps.companies.models import *

class CompaniesAdmin(admin.ModelAdmin):
    list_display = ('company_name', 'description','address','phone','establishment_date')
    list_display_links = ('company_name', 'description','address','phone','establishment_date')
    list_filter = ('company_name', 'address__country') 

class WorkRequestsAdmin(admin.ModelAdmin):
    list_display = ('user', 'company','status')
    list_display_links = ('user', 'company','status')
    list_filter = ('company','status') 


class WorksOnAdmin(admin.ModelAdmin):
    list_display = ('employee_company','employee_name', 'is_admin')
    list_display_links = ('employee_company', 'employee_name','is_admin')
    list_filter = ('employee__company','is_admin') 

    def employee_name(self, obj):
        return obj.employee.user 

    def employee_company(self, obj):
        return obj.employee.company 


admin.site.register(Companies,CompaniesAdmin)
admin.site.register(WorkRequests,WorkRequestsAdmin)
admin.site.register(WorksOn, WorksOnAdmin)
