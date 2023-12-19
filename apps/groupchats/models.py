from django.db import models
from django.forms import ValidationError

from apps.companies.models import Companies,WorksOn

class GroupChats(models.Model):
    group_id = models.AutoField(primary_key=True)
    name     = models.TextField(null=False, max_length=256)
    company  = models.ForeignKey(Companies, on_delete = models.CASCADE)

    def __str__(self):
        return f'Group Chat[{self.company} | {self.name}]'

    class Meta:
        db_table = 'group_chats'

class GroupChatsAdmins(models.Model):
    group = models.ForeignKey(GroupChats, on_delete = models.CASCADE)
    admin = models.ForeignKey(WorksOn,    on_delete = models.CASCADE)

    def __str__(self):
        return f'{self.group} admins by {self.admin.employee.user}'

    def clean(self):
        if self.group.company != self.admin.employee.company:
            raise ValidationError("Different company admin!")
        super().clean()

    class Meta:
        db_table = 'group_chats_admins'


class GroupChatMembers(models.Model):
    group  = models.ForeignKey(GroupChats, on_delete = models.CASCADE)
    member = models.ForeignKey(WorksOn,    on_delete = models.CASCADE)

    def __str__(self):
        return f'{self.group} member -> {self.member.employee.user}'

    def clean(self):
        if self.group.company != self.member.employee.company:
            raise ValidationError("Company Group Chat can only have members their employees!")
        super().clean()

    class Meta:
        db_table = 'group_chats_members'