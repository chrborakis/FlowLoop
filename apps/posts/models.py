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
    

class PostsPrivateLikes(models.Model):
    post = models.ForeignKey(PostsPrivate, on_delete=models.CASCADE)
    like = models.ForeignKey(WorksOn, on_delete=models.CASCADE)

    class Meta: 
        db_table = 'posts_private_likes'

    def clean(self):
        if self.post.author.employee.company != self.like.employee.company:
            raise ValidationError("The author and the liker must belong to the same company.")

    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)

    def __str__(self):
        return f'[{self.post.author.employee.company} - {self.post.title}] liked by {self.like.employee.user}'


class PostsPublic(models.Model):
    post_id = models.AutoField(primary_key=True)
    slug = models.SlugField( unique=True, db_index=True, blank=True, null=True, editable=False, max_length=128)
    author = models.ForeignKey(Users, to_field="user", on_delete=models.CASCADE)

    title = models.TextField(max_length=64, blank=True, null=True)
    body = models.TextField(blank=False, null=False)
    publish_date = models.DateTimeField(default=now, editable=False)
    image = models.ImageField(upload_to="posts_public", blank=True, null=True)

    def save(self, *args, **kwargs):
        compo_slug = f'{self.author}{self.title}'
        self.slug = slugify(compo_slug)
        super().save(*args, **kwargs)
    class Meta: 
        db_table = 'posts_public'

    def __str__(self):
        return f'[{self.author}] {self.title}'
    
    
class PostsPublicLikes(models.Model):
    post = models.ForeignKey(PostsPublic, on_delete=models.CASCADE)
    like = models.ForeignKey(Users, on_delete=models.CASCADE)
    class Meta: 
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
    