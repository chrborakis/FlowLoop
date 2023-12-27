from django.contrib import admin
from apps.projects.models import *

class ProjectsAdmin(admin.ModelAdmin):
    list_display = ('company', 'title', 'phase', 'start_date', 'finish_date')
    list_display_links = ('company', 'title', 'phase', 'start_date', 'finish_date')
    list_filter = ('company', 'phase')
    ordering = ('company', 'start_date', 'finish_date')


class ProjectDivisionAdmin(admin.ModelAdmin):
    def project_title(self, obj): return obj.project.title
    def company(self, obj):       return obj.project.company

    list_display = ('company', 'project_title','title', 'description')
    list_display_links = ('company', 'project_title','title', 'description')
    list_filter = ('project__company','project')
    ordering = ('project', 'title')


class ProjectAssignAdmin(admin.ModelAdmin):
    def project(self, obj): return obj.division.project
    def company(self, obj): return obj.division.project.company

    list_display = ('project','division', 'assign')
    list_display_links = ('project','division', 'assign')
    list_filter = ('division__project__company', 'division__project')
    ordering = ('division__project__company', 'division__project')

class ProjectAdminAdmin(admin.ModelAdmin):
    list_display = ('project', 'admin')
    list_display_links = ('project', 'admin')
    list_filter = ('project__company', 'admin__employee__company')
    ordering = ('project__company', 'admin__employee__company')

admin.site.register(Projects, ProjectsAdmin)
admin.site.register(ProjectDivision, ProjectDivisionAdmin)
admin.site.register(ProjectAssign, ProjectAssignAdmin)
admin.site.register(ProjectAdmin, ProjectAdminAdmin)