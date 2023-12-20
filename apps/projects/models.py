from django.db import models
import os
from apps.companies.models import Companies

class Projects(models.Model):
    project_id = models.AutoField(primary_key=True)
    company    = models.ForeignKey(Companies, on_delete=models.CASCADE)
    title      = models.CharField( null=False, blank=False, max_length=256)
    description= models.TextField( null=False, blank=False)
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
        db_table = 'projects'


def get_upload_path(instance, filename):
    return os.path.join('projects', str(instance.project.company), str(instance.project.project_id), filename)

class ProjectDivision(models.Model):
    division= models.AutoField(primary_key=True)
    project = models.ForeignKey(Projects, on_delete=models.CASCADE)
    title       = models.CharField( null=False, blank=False, max_length=256)
    description = models.TextField( null=False, blank=False)
    file        = models.FileField(upload_to=get_upload_path, null=True, blank=True)

    def __str__(self):
        return f'{self.project} {self.title}'

    class Meta:
        db_table = 'project_divisions'