from django.db import models
from django.utils.text import slugify
from django.utils.timezone import now

from apps.models import Phone



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
