from django.db import models
from datetime import datetime
from django.utils.timezone import now
from django.utils.text import slugify
from apps.companies.models import Companies

from apps.users.models import Users


class Posts(models.Model):
    post_id = models.AutoField(primary_key=True)
    slug = models.SlugField( unique=True, db_index=True, blank=True, null=True, editable=False)
    title = models.TextField(max_length=64, blank=False, null=False)
    body = models.TextField(blank=False, null=False)
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

    class Meta:
        db_table = 'posts_public'
