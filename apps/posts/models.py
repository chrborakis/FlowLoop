import os
from django.db import models
from datetime import datetime
from django.forms import ValidationError
from django.utils.timezone import now
from django.utils.text import slugify

from apps.users.models import Users
from apps.companies.models import WorksOn

def get_upload_path_private(instance, filename):
    return os.path.join('posts/posts_private', str(instance.author.employee.company), filename)

class PostsPrivate(models.Model):
    post_id = models.AutoField(primary_key=True)
    # slug    = models.SlugField( unique=True, db_index=True, blank=True, null=True, editable=False, max_length=128)
    author  = models.ForeignKey(WorksOn, to_field="id", on_delete=models.CASCADE)
    title   = models.CharField(max_length=64, blank=True, null=True)
    body    = models.TextField(blank=False, null=False)
    publish_date = models.DateTimeField(default=now, editable=False)
    image   = models.ImageField(upload_to=get_upload_path_private, blank=True, null=True)

    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)
    class Meta: 
        db_table = 'posts_private'

    def __str__(self):
        return f'[{self.author.employee.company} - {self.author.employee.user}] {self.title}'
    

class PostsPrivateLikes(models.Model):
    post = models.ForeignKey(PostsPrivate, on_delete=models.CASCADE)
    like = models.ForeignKey(WorksOn, on_delete=models.CASCADE)

    class Meta: 
        unique_together = ('post', 'like',)
        db_table = 'posts_private_likes'

    def clean(self):
        if self.post.author.employee.company != self.like.employee.company:
            raise ValidationError("The author and the liker must belong to the same company.")

    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)

    def __str__(self):
        return f'[{self.post.author.employee.company} - {self.post.title}] liked by {self.like.employee.user}'

def get_upload_path_public(instance, filename):
    author = str(instance.author.firstname) + '' + str(instance.author.lastname)
    return os.path.join('posts/posts_public', author, filename)

class PostsPublic(models.Model):
    post_id = models.AutoField(primary_key=True)
    # slug = models.SlugField( unique=True, db_index=True, blank=True, null=True, editable=False, max_length=128)
    author = models.ForeignKey(Users, to_field="user", on_delete=models.CASCADE)
    title = models.CharField(max_length=64, blank=True, null=True)
    body = models.TextField(blank=False, null=False)
    publish_date = models.DateTimeField(default=now, editable=False)
    image = models.ImageField(upload_to=get_upload_path_public, blank=True, null=True)

    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)

    # def update_slug(self):
    #     compo_slug = f'{self.author}{self.post_id}'
    #     self.slug = slugify(compo_slug)
    #     self.save(update_fields=['slug']) 

    class Meta: 
        db_table = 'posts_public'

    def __str__(self):
        return f'[{self.author}] {self.title}'
    
    
class PostsPublicLikes(models.Model):
    post = models.ForeignKey(PostsPublic, on_delete=models.CASCADE)
    like = models.ForeignKey(Users, on_delete=models.CASCADE)
    class Meta: 
        unique_together = ('post', 'like',)
        db_table = 'posts_public_likes'

    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)

    def __str__(self):
        return f'[{self.post.author} - {self.post.title}] liked by {self.like}'
    


class PostsPrivateComments(models.Model):
    post = models.ForeignKey(PostsPrivate, on_delete=models.CASCADE)
    commentor = models.ForeignKey(WorksOn, on_delete=models.CASCADE)
    comment   = models.TextField(null=False, max_length=2048)
    date      = models.DateTimeField(default=now, editable=False)

    class Meta: 
        db_table = 'posts_private_comments'

    def clean(self):
        if self.post.author.employee.company != self.commentor.employee.company:
            raise ValidationError("The author and the commentor must belong to the same company.")


    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)

    def __str__(self):
        return f'[{self.post.author} - {self.post.title}] comments {self.commentor.employee.user} "{self.comment}"'
    


class PostsPublicComments(models.Model):
    post = models.ForeignKey(PostsPublic, on_delete=models.CASCADE)
    commentor = models.ForeignKey(Users, on_delete=models.CASCADE)
    comment   = models.TextField(null=False, max_length=2048)
    date      = models.DateTimeField(default=now, editable=False)

    class Meta: 
        db_table = 'posts_public_comments'

    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)

    def __str__(self):
        return f'[{self.post.author} - {self.post.title}] comments {self.commentor} "{self.comment}"'
    