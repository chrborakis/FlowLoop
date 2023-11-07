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





class UsersCredentials(models.Model):
    user_id = models.AutoField(primary_key=True)
    email = models.EmailField(unique=True)
    password = models.TextField()

    class Meta:
        db_table = 'users_credentials'
    def __str__(self):
        return f'{self.email}'

class Users(models.Model):
    user = models.OneToOneField(UsersCredentials, on_delete=models.CASCADE, primary_key=True)
    firstname = models.CharField(max_length=32)
    midname = models.CharField(max_length=32, blank=True, null=True)
    lastname = models.CharField(max_length=32)
    slug = models.SlugField( unique=True, db_index=True, blank=True, null=True, editable=True)
    occupation = models.CharField(max_length=64, blank=True, null=True)
    gender = models.CharField(max_length=6)
    image = models.ImageField(upload_to="user_image", blank=True, null=True)
    phones = models.ForeignKey(Phone, on_delete=models.CASCADE, null=True, unique=True)
    about = models.TextField(blank=True, null=True)
    country = models.CharField(max_length=64)
    create_date = models.DateTimeField(default=now, editable=False)

    def save(self, *args, **kwargs):
        self.slug = '-'.join((slugify(self.firstname), slugify(self.lastname)))
        super(Users, self).save(*args, **kwargs)


    class Meta:  
        db_table = 'users'

    def __str__(self):
        return f"{self.firstname} {self.lastname}"
    


class EducationDetails(models.Model):
    user = models.ForeignKey(Users, on_delete=models.CASCADE, null=False)
    name = models.CharField(max_length=128, null=False)
    graduation = models.DateField( null=False)
    class Meta:
        db_table = 'education_details'
    def __str__(self):
        return f'{self.user} {(self.name)}'


class UniversityDetails(models.Model):
    user = models.ForeignKey(Users, on_delete=models.CASCADE, null=False)
    name = models.CharField(max_length=128, null=False)
    graduation = models.DateField( null=False)
    degree = models.CharField(max_length=64, null=False)
    class Meta:
        db_table = 'university_details'
    def __str__(self):
        return f'{self.user} {(self.name)}'




class Companies(models.Model):
    company_id = models.AutoField(primary_key=True)
    company_name = models.TextField(unique=True)
    slug = models.SlugField( unique=True, db_index=True, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    address = models.ForeignKey(Address, on_delete=models.CASCADE)
    phones = models.ForeignKey(Phone, on_delete=models.CASCADE)
    image = models.ImageField(upload_to="company_image", blank=True, null=True)
    establishment_date = models.DateField(blank=False, null=False)
    creation_date = models.DateField(default=now, editable=False, blank=True, null=True)

    def save(self, *args, **kwargs):
        self.slug = slugify(self.company_name)
        super().save(*args, **kwargs)
    class Meta:
        db_table = 'companies'
    def __str__(self):
        return f'{self.company_name}'


class WorksOn(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(Users, on_delete=models.CASCADE, to_field="user_id")
    company = models.ForeignKey(Companies, on_delete=models.CASCADE, to_field="company_id")
    STATUS = [        ("P", "Pending"),        ("A", "Accepted"),        ("D", "Declined")    ]
    status = models.TextField(
        choices=STATUS,
        default="P",
        blank=False, null=False
    )
    role = models.TextField(blank=True, max_length=128, null=True)

    class Meta:
        db_table = 'works_on'
        unique_together = (('user', 'company'),)
    def __str__(self):
        return f'[{self.status}] {self.user} -> {self.company.company_name}'



class CompaniesAdmins(models.Model):
    id = models.AutoField(primary_key=True)
    company = models.ForeignKey(Companies, on_delete=models.CASCADE, to_field="company_id", related_name="company_to_admin")  # The composite primary key (company, isadmin) found, that is not supported. The first column is selected.
    isadmin = models.ForeignKey(Users, on_delete=models.CASCADE, to_field="user", related_name="admin")
        
    class Meta:
        db_table = 'companies_admins'
        unique_together = ('company', 'isadmin')
    def __str__(self):
        return f'[{self.company}] administrated by {self.isadmin}'
    
    def save(self, *args, **kwargs):
        if self.should_save():
            super(CompaniesAdmins, self).save(*args, **kwargs)
        else:
            raise ValueError("User must work on the company in order to admin it.")
    def should_save(self):
        return WorksOn.objects.filter(user=self.isadmin, company=self.company).exists()





# ---------------------------------------------------------------------------------------------





class Posts(models.Model):
    post_id = models.AutoField(primary_key=True)
    slug = models.SlugField( unique=True, db_index=True, blank=True, null=True)
    title = models.TextField(blank=True, null=True)
    body = models.TextField()
    publish_date = models.DateTimeField(default=now, editable=False)
    image = models.ImageField(upload_to="posts", blank=True, null=True)

    def save(self, *args, **kwargs):
        self.slug = slugify(self.title)
        super().save(*args, **kwargs)
        
    class Meta: 
        db_table = 'posts'

class PostsPrivate(Posts):
    author = models.ForeignKey(Users, on_delete=models.CASCADE, db_column='author', to_field="user")
    company = models.ForeignKey(Companies, on_delete=models.CASCADE, db_column='company_id', to_field="company_id")

    class Meta:  
        db_table = 'posts_private'


class PostsPublic(Posts):
    author = models.ForeignKey(Users, on_delete=models.CASCADE, db_column='author', to_field="user")
    company = models.ForeignKey(Companies, on_delete=models.CASCADE, db_column='company_id', to_field="company_id")

    class Meta:
        db_table = 'posts_public'




class CommentClass(models.Model):
    comment_id = models.AutoField(primary_key=True)
    post = models.ForeignKey(Posts, on_delete=models.CASCADE, to_field="post_id")
    comment_content = models.TextField()
    comment_date = models.DateTimeField(default=now, editable=False)
    class Meta:
        db_table = 'comment_class'


class CommentPrivate(CommentClass):
    commenter = models.ForeignKey(Users, on_delete=models.CASCADE, db_column='commenter', to_field="user")
    company = models.ForeignKey(Companies, on_delete=models.CASCADE, db_column='company_id', to_field="company_id")


class CommentPublic(CommentClass):
    commenter = models.ForeignKey(Users, on_delete=models.CASCADE, db_column='commenter', to_field="user")



class GroupChats(models.Model):
    group_id = models.AutoField(primary_key=True)
    company = models.ForeignKey(Companies, on_delete=models.CASCADE, to_field="company_id")
    title = models.TextField()
    group_admin = models.ForeignKey(Users, on_delete=models.CASCADE, to_field="user")

    class Meta:
        db_table = 'group_chats'

class GroupChatMembers(models.Model):
    id = models.AutoField(primary_key=True)
    group = models.ForeignKey(GroupChats, on_delete=models.CASCADE, db_column="group_id", to_field="group_id")  # The composite primary key (group_id, group_member) found, that is not supported. The first column is selected.
    group_member = models.ForeignKey(Users, on_delete=models.CASCADE, db_column="user", to_field="user")

    class Meta:
        db_table = 'group_chat_members'
        unique_together = (('group', 'group_member'),)

class GroupChat(models.Model):
    message_id = models.AutoField(primary_key=True)  # The composite primary key (message_id, group_id, sender) found, that is not supported. The first column is selected.
    group = models.ForeignKey(GroupChats, on_delete=models.CASCADE, db_column="group_id", related_name="group_chat", to_field="group_id")
    sender = models.ForeignKey(Users, on_delete=models.CASCADE, related_name="user_Id", to_field="user_id")
    content = models.TextField()
    send_date = models.DateTimeField(default=now, editable=False)

    class Meta:
        db_table = 'group_chat'
        unique_together = (('message_id', 'group', 'sender'),)


class PrivateChat(models.Model):
    message_id = models.AutoField(primary_key=True)  # The composite primary key (message_id, sender, receiver) found, that is not supported. The first column is selected.
    sender = models.ForeignKey(Users, on_delete=models.CASCADE, db_column='sender', to_field="user_id")
    receiver = models.ForeignKey(Users, on_delete=models.CASCADE, db_column='receiver', related_name='privatechat_receiver_set', to_field="user_id")
    content = models.TextField()
    senddate = models.DateTimeField(default=now, editable=False)

    class Meta:
        db_table = 'private_chat'
        unique_together = (('message_id', 'sender', 'receiver'),)





class LikesPrivate(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(Users, on_delete=models.CASCADE, related_name="private_like_user", to_field="user")  # The composite primary key (user_id, post_id) found, that is not supported. The first column is selected.
    post_id = models.ForeignKey(Posts, on_delete=models.CASCADE,related_name="like_on_private_post_id", to_field="post_id")
    company_id = models.ForeignKey(Companies, on_delete=models.CASCADE, related_name="company", to_field="company_id")

    class Meta:  
        db_table = 'likes_private'
        unique_together = (('user', 'post_id'),)


class LikesPublic(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(Users, on_delete=models.CASCADE,related_name="public_like_user", to_field="user")  # The composite primary key (user_id, post_id) found, that is not supported. The first column is selected.
    post_id = models.ForeignKey(Posts, on_delete=models.CASCADE,related_name="like_on_public_post_id", to_field="post_id")

    class Meta:
        db_table = 'likes_public'
        unique_together = (('user', 'post_id'),)








class Projects(models.Model):
    project_id = models.AutoField(primary_key=True)
    company = models.ForeignKey(Companies, on_delete=models.CASCADE, db_column='company', to_field="company_id")
    project_name = models.TextField()
    description = models.TextField()
    phase = models.TextField(blank=True, null=True)  # This field type is a guess.
    start_date = models.DateTimeField(default=datetime.now, blank=True)
    finish_date = models.DateField(blank=True, null=True)

    class Meta:
        db_table = 'projects'

class ProjectDivision(models.Model):
    division_id = models.AutoField(primary_key=True)
    project = models.ForeignKey(Projects, on_delete=models.CASCADE, to_field="project_id")  # The composite primary key (project_id, division_id) found, that is not supported. The first column is selected.
    title = models.TextField()
    description = models.TextField(blank=True, null=True)
    phase = models.TextField(blank=True, null=True)  # This field type is a guess.

    class Meta:
        db_table = 'project_division'
        unique_together = (('project', 'division_id'),)


class ProjectMembers(models.Model):
    id = models.AutoField(primary_key=True)
    member = models.ForeignKey(Users,on_delete=models.CASCADE, db_column='project_member', to_field="user")  # The composite primary key (member, project, division) found, that is not supported. The first column is selected.
    project = models.ForeignKey(Projects, on_delete=models.CASCADE, related_name="project", to_field="project_id")
    division = models.ForeignKey(ProjectDivision, on_delete=models.CASCADE, related_name="division_member", to_field="division_id")
    status = models.TextField()  # This field type is a guess.
    company =  models.ForeignKey(Companies, on_delete=models.CASCADE, db_column='company_project_member', to_field="company_id")

    class Meta:
        db_table = 'project_members'
        unique_together = (('member', 'project', 'division'),)


class ProjectSupervisor(models.Model):
    id = models.AutoField(primary_key=True)
    supervisor = models.ForeignKey(Users, on_delete=models.CASCADE, db_column='supervisor', to_field="user")
    project = models.ForeignKey(Projects, on_delete=models.CASCADE, to_field="project_id")  # The composite primary key (project, division, supervisor) found, that is not supported. The first column is selected.
    division = models.IntegerField()

    class Meta:
        db_table = 'project_supervisor'
        unique_together = (('project', 'division', 'supervisor'),)

