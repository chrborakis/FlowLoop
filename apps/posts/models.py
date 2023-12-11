from django.db import models
from datetime import datetime
from django.forms import ValidationError
from django.utils.timezone import now
from django.utils.text import slugify

from apps.users.models import Users
from apps.companies.models import WorksOn



# class Posts(models.Model):
#     post_id = models.AutoField(primary_key=True)
#     slug = models.SlugField( unique=True, db_index=True, blank=True, null=True, editable=False)
#     title = models.TextField(max_length=64, blank=True, null=True)
#     body = models.TextField(blank=False, null=False)
#     publish_date = models.DateTimeField(default=now, editable=False)
#     image = models.ImageField(upload_to="posts", blank=True, null=True)

#     def save(self, *args, **kwargs):
#         self.slug = slugify(self.title)
#         super().save(*args, **kwargs)
        
#     class Meta: 
#         db_table = 'posts'

class PostsPrivate(models.Model):
    post_id = models.AutoField(primary_key=True)
    slug = models.SlugField( unique=True, db_index=True, blank=True, null=True, editable=False, max_length=128)
    author = models.ForeignKey(WorksOn, to_field="id", on_delete=models.CASCADE)

    title = models.TextField(max_length=64, blank=True, null=True)
    body = models.TextField(blank=False, null=False)
    publish_date = models.DateTimeField(default=now, editable=False)
    image = models.ImageField(upload_to="posts_private", blank=True, null=True)

    def save(self, *args, **kwargs):
        compo_slug = f'{self.author.employee.company}{self.title}'
        self.slug = slugify(compo_slug)
        super().save(*args, **kwargs)
    class Meta: 
        db_table = 'posts_private'

    def __str__(self):
        return f'[{self.author.employee.company} - {self.author.employee.user}] {self.title}'
    

class PostPrivateLikes(models.Model):
    post_id = models.ForeignKey(PostsPrivate, on_delete=models.CASCADE)
    like    = models.ForeignKey(WorksOn, on_delete=models.CASCADE)

    def clean(self):
        if self.post_id.author.employee.company != self.like.employee.company:
            raise ValidationError("The author and the liker must belong to the same company.")

    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)

    def __str__(self):
        return f'[{self.post_id.author.employee.company} - {self.post_id.title}] liked by {self.like.employee.user}'

# class PostsPublic(Posts):
#     author = models.ForeignKey(Users, on_delete=models.CASCADE, db_column='author', to_field="user")

#     class Meta:
#         db_table = 'posts_public'
