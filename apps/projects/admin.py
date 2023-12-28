from django.contrib import admin
from apps.projects.models import *

class ProjectsAdmin(admin.ModelAdmin):
    def members(self,obj):
        return ProjectDivision.objects.filter(project=obj.project_id).count()
    list_display = ('company', 'title', 'phase', 'start_date', 'finish_date','members')
    list_display_links = ('company', 'title', 'phase', 'start_date', 'finish_date','members')
    list_filter = ('company', 'phase')
    ordering = ('company', 'start_date', 'finish_date')


class ProjectDivisionAdmin(admin.ModelAdmin):
    def members(self,obj):
        return ProjectAssign.objects.filter(division=obj.division).count()
    def project_title(self, obj): return obj.project.title
    def company(self, obj):       return obj.project.company

    list_display = ('company', 'project_title','title', 'description','members')
    list_display_links = ('company', 'project_title','title', 'description','members')
    list_filter = ('project__company','project')
    ordering = ('project__company','project', 'title')


class ProjectAssignAdmin(admin.ModelAdmin):
    def project(self, obj): return obj.division.project
    def subproject(self, obj): return obj.division.title
    def company(self, obj): return obj.division.project.company

    list_display = ('project','subproject', 'assign')
    list_display_links = ('project','subproject', 'assign')
    list_filter = ('division__project__company', 'division__project','assign')
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