from django.contrib import admin

from apps.companies.models import *

class CompaniesAdmin(admin.ModelAdmin):
    def employees(self,obj):
        return WorksOn.objects.filter(employee__company=obj.company_id).count()
    list_display = ('company_name', 'description','address','phone','establishment_date','employees')
    list_display_links = ('company_name', 'description','address','phone','establishment_date','employees')
    list_filter = ('company_name', 'address__country') 
    list_sorting = ('company_name',)
    ordering = ('company_name',)

class WorkRequestsAdmin(admin.ModelAdmin):
    list_display = ('user', 'company','status')
    list_display_links = ('user', 'company','status')
    list_filter = ('company','status') 


class WorksOnAdmin(admin.ModelAdmin):
    def employee_name(self, obj):
        return obj.employee.user 

    def employee_company(self, obj):
        return obj.employee.company 
    
    list_display = ('employee_company','employee_name', 'is_admin')
    list_display_links = ('employee_company', 'employee_name','is_admin')
    list_filter = ('employee__company','is_admin') 
    list_sorting = ('employee__company',)
    ordering = ('employee__company',)
    

admin.site.register(Companies,CompaniesAdmin)
admin.site.register(WorkRequests,WorkRequestsAdmin)
admin.site.register(WorksOn, WorksOnAdmin)
