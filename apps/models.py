from django.db import models
from postgres_composite_types import CompositeType
from datetime import datetime
from django.utils.timezone import now
from django.utils.text import slugify

#COMPOSITE TYPES
class Address(models.Model):
    country = models.CharField(max_length=64)
    city    = models.CharField(max_length=64)
    street  = models.CharField(max_length=64)
    class Meta:
        db_table = 'address'
    def __str__(self):
        return f'{self.country} ({self.street} {self.city})'

class Phone(models.Model):
    code = models.CharField(max_length=5)
    number = models.CharField(max_length=16, unique=True)
    class Meta:
        db_table = 'phone'
    def __str__(self):
        return f'(+{self.code}) {self.number}'

# ---------------------------------------------------------------------------------------------

# class CommentClass(models.Model):
#     comment_id = models.AutoField(primary_key=True)
#     post = models.ForeignKey(Posts, on_delete=models.CASCADE, to_field="post_id")
#     comment_content = models.TextField()
#     comment_date = models.DateTimeField(default=now, editable=False)
#     class Meta:
#         db_table = 'comment_class'


# class CommentPrivate(CommentClass):
#     commenter = models.ForeignKey(Users, on_delete=models.CASCADE, db_column='commenter', to_field="user")
#     company = models.ForeignKey(Companies, on_delete=models.CASCADE, db_column='company_id', to_field="company_id")


# class CommentPublic(CommentClass):
#     commenter = models.ForeignKey(Users, on_delete=models.CASCADE, db_column='commenter', to_field="user")



# class GroupChats(models.Model):
#     group_id = models.AutoField(primary_key=True)
#     company = models.ForeignKey(Companies, on_delete=models.CASCADE, to_field="company_id")
#     title = models.TextField()
#     group_admin = models.ForeignKey(Users, on_delete=models.CASCADE, to_field="user")

#     class Meta:
#         db_table = 'group_chats'

# class GroupChatMembers(models.Model):
#     id = models.AutoField(primary_key=True)
#     group = models.ForeignKey(GroupChats, on_delete=models.CASCADE, db_column="group_id", to_field="group_id")  # The composite primary key (group_id, group_member) found, that is not supported. The first column is selected.
#     group_member = models.ForeignKey(Users, on_delete=models.CASCADE, db_column="user", to_field="user")

#     class Meta:
#         db_table = 'group_chat_members'
#         unique_together = (('group', 'group_member'),)

# class GroupChat(models.Model):
#     message_id = models.AutoField(primary_key=True)  # The composite primary key (message_id, group_id, sender) found, that is not supported. The first column is selected.
#     group = models.ForeignKey(GroupChats, on_delete=models.CASCADE, db_column="group_id", related_name="group_chat", to_field="group_id")
#     sender = models.ForeignKey(Users, on_delete=models.CASCADE, related_name="user_Id", to_field="user_id")
#     content = models.TextField()
#     send_date = models.DateTimeField(default=now, editable=False)

#     class Meta:
#         db_table = 'group_chat'
#         unique_together = (('message_id', 'group', 'sender'),)


# class PrivateChat(models.Model):
#     message_id = models.AutoField(primary_key=True)  # The composite primary key (message_id, sender, receiver) found, that is not supported. The first column is selected.
#     sender = models.ForeignKey(Users, on_delete=models.CASCADE, db_column='sender', to_field="user_id")
#     receiver = models.ForeignKey(Users, on_delete=models.CASCADE, db_column='receiver', related_name='privatechat_receiver_set', to_field="user_id")
#     content = models.TextField()
#     senddate = models.DateTimeField(default=now, editable=False)

#     class Meta:
#         db_table = 'private_chat'
#         unique_together = (('message_id', 'sender', 'receiver'),)





# class LikesPrivate(models.Model):
#     id = models.AutoField(primary_key=True)
#     user = models.ForeignKey(Users, on_delete=models.CASCADE, related_name="private_like_user", to_field="user")  # The composite primary key (user_id, post_id) found, that is not supported. The first column is selected.
#     post_id = models.ForeignKey(Posts, on_delete=models.CASCADE,related_name="like_on_private_post_id", to_field="post_id")
#     company_id = models.ForeignKey(Companies, on_delete=models.CASCADE, related_name="company", to_field="company_id")

#     class Meta:  
#         db_table = 'likes_private'
#         unique_together = (('user', 'post_id'),)


# class LikesPublic(models.Model):
#     id = models.AutoField(primary_key=True)
#     user = models.ForeignKey(Users, on_delete=models.CASCADE,related_name="public_like_user", to_field="user")  # The composite primary key (user_id, post_id) found, that is not supported. The first column is selected.
#     post_id = models.ForeignKey(Posts, on_delete=models.CASCADE,related_name="like_on_public_post_id", to_field="post_id")

#     class Meta:
#         db_table = 'likes_public'
#         unique_together = (('user', 'post_id'),)








# class Projects(models.Model):
#     project_id = models.AutoField(primary_key=True)
#     company = models.ForeignKey(Companies, on_delete=models.CASCADE, db_column='company', to_field="company_id")
#     project_name = models.TextField()
#     description = models.TextField()
#     phase = models.TextField(blank=True, null=True)  # This field type is a guess.
#     start_date = models.DateTimeField(default=datetime.now, blank=True)
#     finish_date = models.DateField(blank=True, null=True)

#     class Meta:
#         db_table = 'projects'

# class ProjectDivision(models.Model):
#     division_id = models.AutoField(primary_key=True)
#     project = models.ForeignKey(Projects, on_delete=models.CASCADE, to_field="project_id")  # The composite primary key (project_id, division_id) found, that is not supported. The first column is selected.
#     title = models.TextField()
#     description = models.TextField(blank=True, null=True)
#     phase = models.TextField(blank=True, null=True)  # This field type is a guess.

#     class Meta:
#         db_table = 'project_division'
#         unique_together = (('project', 'division_id'),)


# class ProjectMembers(models.Model):
#     id = models.AutoField(primary_key=True)
#     member = models.ForeignKey(Users,on_delete=models.CASCADE, db_column='project_member', to_field="user")  # The composite primary key (member, project, division) found, that is not supported. The first column is selected.
#     project = models.ForeignKey(Projects, on_delete=models.CASCADE, related_name="project", to_field="project_id")
#     division = models.ForeignKey(ProjectDivision, on_delete=models.CASCADE, related_name="division_member", to_field="division_id")
#     status = models.TextField()  # This field type is a guess.
#     company =  models.ForeignKey(Companies, on_delete=models.CASCADE, db_column='company_project_member', to_field="company_id")

#     class Meta:
#         db_table = 'project_members'
#         unique_together = (('member', 'project', 'division'),)


# class ProjectSupervisor(models.Model):
#     id = models.AutoField(primary_key=True)
#     supervisor = models.ForeignKey(Users, on_delete=models.CASCADE, db_column='supervisor', to_field="user")
#     project = models.ForeignKey(Projects, on_delete=models.CASCADE, to_field="project_id")  # The composite primary key (project, division, supervisor) found, that is not supported. The first column is selected.
#     division = models.IntegerField()

#     class Meta:
#         db_table = 'project_supervisor'
#         unique_together = (('project', 'division', 'supervisor'),)

