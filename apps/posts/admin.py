from django.contrib import admin
from apps.posts.models import *

admin.site.register(PostsPrivate)
admin.site.register(PostsPrivateLikes)
admin.site.register(PostsPrivateComments)

admin.site.register(PostsPublic)
admin.site.register(PostsPublicLikes)
admin.site.register(PostsPublicComments)