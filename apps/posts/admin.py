from django.contrib import admin
from apps.posts.models import *

admin.site.register(PostsPrivate)
admin.site.register(PostPrivateLikes)