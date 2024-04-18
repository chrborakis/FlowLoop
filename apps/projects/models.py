from django.db import models
import os

from django.forms import ValidationError
from apps.companies.models import Companies, WorksOn

class Projects(models.Model):
    project_id = models.AutoField(primary_key=True)
    company    = models.ForeignKey(Companies, on_delete=models.CASCADE)
    title      = models.TextField( null=False, blank=False, max_length=1024)
    description= models.TextField( null=False, blank=False, max_length=2048)
    STATUS = [("I", "Initiation"),("P", "Planning"),("E", "Execution"),("C", "Closed"),    ]
    phase = models.TextField(
        choices=STATUS,
        default="I",
        blank=False, null=False
    )
    start_date  = models.DateField(blank=False, null=False)
    finish_date = models.DateField(blank=False, null=False)

    def __str__(self):
        return f'[{self.company}|{self.title}] '

    class Meta:
        unique_together = ('company', 'title',)
        db_table = 'projects'


def get_upload_path(instance, filename):
    return os.path.join('projects', str(instance.project.company), str(instance.division), str(instance.project.project_id), filename)

class ProjectDivision(models.Model):
    division= models.AutoField(primary_key=True)
    project = models.ForeignKey(Projects, on_delete=models.CASCADE)
    title       = models.TextField( null=False, blank=False, max_length=1024)
    description = models.TextField( null=False, blank=False, max_length=2048)
    file        = models.FileField(upload_to=get_upload_path, null=True, blank=True)

    def __str__(self):
        return f'{self.project}{self.title}'

    class Meta:
        unique_together = ('project', 'title',)
        db_table = 'project_divisions'

    
class ProjectRequestAssign(models.Model):
    division = models.ForeignKey(ProjectDivision, on_delete=models.CASCADE)
    employee = models.ForeignKey(WorksOn, on_delete=models.CASCADE)
    STATUS = [("P", "Pending"),("A", "Accepted"),("D", "Declined")]
    status = models.CharField(max_length=1, choices=STATUS, default="P")

    def __str__(self):
        return f'{self.employee} -> {self.status}'
    class Meta:
        unique_together = ('division', 'employee',)
        db_table = 'project_request_assign'
    def clean(self):
        if self.division.project.company != self.employee.employee.company:
            raise ValidationError("Project participants should be working for the company!")
        if ProjectAssign.objects.filter(division=self.division).exists():
            raise ValidationError("A division can only have one participant!")
        


class ProjectAssign(models.Model):
    participant_id = models.AutoField(primary_key=True, null=False)
    division = models.OneToOneField(ProjectDivision, on_delete=models.CASCADE)
    assign   = models.ForeignKey(WorksOn, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.assign.employee.user} -> {self.division}'

    def clean(self):
        print(f'Division: {self.division.division} Assign: {self.assign.employee.user.user.user_id}')
        if ProjectAssign.objects.filter(division=self.division,assign=self.assign).exclude(pk=self.pk).first():
            raise ValidationError("Project division with this participant already exists.")
        existing_assignment = ProjectAssign.objects.filter(division=self.division).exclude(pk=self.pk).first()
        if existing_assignment:
            raise ValidationError("A division can only have one participant!")
        if self.division.project.company != self.assign.employee.company:
            raise ValidationError("Project participants should be working for the company!")

    class Meta:
        unique_together = ('division', 'assign',)
        db_table = 'project_assign'


class ProjectAdmin(models.Model):
    id = models.AutoField(primary_key=True)
    project = models.ForeignKey(Projects, on_delete = models.CASCADE)
    admin   = models.ForeignKey(WorksOn,  on_delete = models.CASCADE)

    def __str__(self):
        return f'{self.project} admins by {self.admin.employee.user}'

    def clean(self):
        if self.project.company != self.admin.employee.company:
            raise ValidationError("Project admins should be working for the company!")
        
    class Meta:
        db_table = 'project_admins'