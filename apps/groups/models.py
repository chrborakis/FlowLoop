from django.utils import timezone
import os
from django.db import models
from django.forms import ValidationError
from django.utils.timezone import now
from apps.companies.models import Companies,WorksOn

class Groups(models.Model):
    group_id = models.AutoField(primary_key=True)
    name     = models.CharField(null=False, max_length=256)
    company  = models.ForeignKey(Companies, on_delete = models.CASCADE)

    def __str__(self):
        return f'[{self.company} | {self.name}]'

    class Meta:
        db_table = 'groups'

class GroupAdmins(models.Model):
    id = models.AutoField(primary_key=True)
    group = models.ForeignKey(Groups, on_delete = models.CASCADE)
    admin = models.ForeignKey(WorksOn,    on_delete = models.CASCADE)

    def __str__(self):
        return f'{self.group} admins by {self.admin.employee.user}'

    def clean(self):
        if self.group.company != self.admin.employee.company:
            raise ValidationError("Different company admin!")
        super().clean()

    class Meta:
        unique_together = ('group','admin')
        db_table = 'group_admins'


class GroupMembers(models.Model):
    id = models.AutoField(primary_key=True)
    group  = models.ForeignKey(Groups,  on_delete = models.CASCADE)
    member = models.ForeignKey(WorksOn, on_delete = models.CASCADE)

    def __str__(self):
        return f'{self.group} -> {self.member.employee.user}'

    def clean(self):
        if self.group.company != self.member.employee.company:
            raise ValidationError("Company Group can only have members their employees!")
        super().clean()

    class Meta:
        unique_together = ('group', 'member',)
        db_table = 'group_members'

def get_upload_path(instance, filename):
    return os.path.join('groupchat', str(instance.group.company), str(instance.group.group_id), filename)

class GroupChat(models.Model):
    id = models.AutoField(primary_key=True)
    group   = models.ForeignKey(Groups,       on_delete=models.CASCADE)
    sender  = models.ForeignKey(GroupMembers, on_delete=models.SET_NULL, null=True)
    message = models.TextField(null=False,blank=False)
    file    = models.FileField(upload_to=get_upload_path, null=True, blank=True)
    send_date = models.DateTimeField(auto_now=True)
    def __str__(self):
        return f'{self.send_date} {self.sender}-> {self.message}'

    def clean(self):
        sender_is_member = GroupMembers.objects.filter(group=self.group, member=self.sender.member).exclude(pk=self.pk).first()
        if not sender_is_member:
            raise ValidationError("Sender is not member of the group!")
        super().clean()
    class Meta:
        db_table = 'group_chat'