import os
import uuid
from django.db import models
from django.forms import ValidationError
from django.utils.text import slugify
from django.utils.timezone import now
from phonenumber_field.modelfields import PhoneNumberField
from django.contrib.auth.hashers import make_password
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

from rest_framework.authtoken.models import Token as DefaultToken

from flow_loop import settings


from django.contrib.auth.hashers import check_password
    
class UsersCredentials(models.Model):
    user_id  = models.AutoField(primary_key=True)
    email    = models.EmailField(null=False,unique=True)
    password = models.TextField(null=False)

    def check_password(self, raw_password):
        return check_password(raw_password, self.password)
    def save(self, *args, **kwargs):    
        self.password = make_password(self.password)
        super().save(*args, **kwargs)

    class Meta:
        db_table = 'users_credentials'
    def __str__(self):
        return f'{self.email}'
    
class CustomToken(models.Model):
    key = models.CharField(max_length=40, primary_key=True, unique=True, default=uuid.uuid4)
    user = models.OneToOneField(UsersCredentials, related_name='auth_token',on_delete=models.CASCADE)

    class Meta:
        db_table = 'custom_auth_token'

    def __str__(self):
        return str(self.key)

def get_upload_path_user(instance, filename):
    return os.path.join('profile/user', str(instance.slug), filename)
class Users(models.Model):
    user = models.OneToOneField(UsersCredentials, on_delete=models.CASCADE, primary_key=True, blank=False,null=False)
    firstname = models.CharField(max_length=32,blank=False, null=False)
    midname = models.CharField(max_length=32, blank=True, null=True)
    lastname = models.CharField(max_length=32,blank=False, null=False)
    slug = models.SlugField( unique=True, db_index=True, blank=True, null=True, editable=False)
    occupation = models.CharField(max_length=64, blank=False, null=False)
    gender = models.TextField(
        choices=[("M", "Male"),("F", "Female")],blank=False, null=False
    )
    image = models.ImageField(upload_to=get_upload_path_user, blank=True, null=True)
    phone = PhoneNumberField(unique=True, blank=False, null=False)
    about = models.TextField(blank=True, null=True)
    country = models.CharField(max_length=64, blank=False,null=False)
    create_date = models.DateTimeField(default=now, editable=False)

    def save(self, *args, **kwargs):
        self.slug = '-'.join((slugify(self.firstname), slugify(self.lastname), slugify(self.user.user_id)))
        super(Users, self).save(*args, **kwargs)
    def __str__(self): return f"{self.firstname} {self.lastname}"

    class Meta:  db_table = 'users'
    
    


class Notifications(models.Model):
    user   = models.ForeignKey(Users, on_delete=models.CASCADE, related_name='notification_receiver')
    sender = models.ForeignKey(Users, on_delete=models.CASCADE, related_name='notification_sender')
    message = models.CharField(max_length=255)
    url     = models.CharField(max_length=255)
    is_read = models.BooleanField(default=False)
    timestamp = models.DateTimeField(default=now, editable=False)

    class Meta:  
        db_table = 'notifications'
    
    def __str__(self):
        return f"{self.user} - {self.message}"

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



class FriendRequests(models.Model):
    id = models.AutoField(primary_key=True)
    sender   = models.ForeignKey( Users, related_name='sender',   on_delete=models.CASCADE)
    receiver = models.ForeignKey( Users, related_name='receiver', on_delete=models.CASCADE)
    STATUS = [("P", "Pending"),("A", "Accepted"),("D", "Declined")]
    status = models.TextField(choices=STATUS, default="P",  blank=False, null=False)
    is_read = models.BooleanField(default=False)
    
    def clean(self):
        if self.sender == self.receiver:
            raise ValidationError("User can't friend request himself!")
    class Meta:
        unique_together = ('receiver', 'sender',)
        unique_together = ('sender', 'receiver',)
        db_table = 'friend_requests'
    
    def __str__(self):
        return f'[{self.status}] {self.sender} -> {self.receiver}'


class Friends(models.Model):
    person   = models.ForeignKey(Users, related_name='person',  on_delete=models.CASCADE)
    friend   = models.ForeignKey(Users, related_name='friend',  on_delete=models.CASCADE)
    class Meta:
        unique_together = ('person', 'friend',)
        unique_together = ('friend', 'person',)
        db_table = 'friends'

    def __str__(self):
        return f'[{self.person}] friends with {self.friend}'
    
    