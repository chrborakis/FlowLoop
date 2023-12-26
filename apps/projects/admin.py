from django.contrib import admin
from apps.projects.models import *

class ProjectsAdmin(admin.ModelAdmin):
    list_display = ('company', 'title', 'phase', 'start_date', 'finish_date')
    list_display_links = ('company', 'title', 'phase', 'start_date', 'finish_date')
    list_filter = ('company', 'phase')
    ordering = ('company', 'start_date', 'finish_date')

class ProjectDivisionAdmin(admin.ModelAdmin):
    list_display = ('project', 'title', 'description')
    list_display_links = ('project', 'title', 'description')
    list_filter = ('project',)
    ordering = ('project', 'title')

class ProjectAssignAdmin(admin.ModelAdmin):
    list_display = ('division', 'assign')
    list_display_links = ('division', 'assign')
    list_filter = ('division__project__company', 'division__project', 'assign__employee__company')
    ordering = ('division__project__company', 'division__project', 'assign__employee__company')

class ProjectAdminAdmin(admin.ModelAdmin):
    list_display = ('project', 'admin')
    list_display_links = ('project', 'admin')
    list_filter = ('project__company', 'admin__employee__company')
    ordering = ('project__company', 'admin__employee__company')

admin.site.register(Projects, ProjectsAdmin)
admin.site.register(ProjectDivision, ProjectDivisionAdmin)
admin.site.register(ProjectAssign, ProjectAssignAdmin)
admin.site.register(ProjectAdmin, ProjectAdminAdmin)