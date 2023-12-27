from django.contrib import admin
from apps.posts.models import *


class PostsPrivateAdmin(admin.ModelAdmin):
    def likes(self,obj):
        return PostsPrivateLikes.objects.filter(post_id=obj.post_id).count()

    def author_company(self, obj):  return obj.author.employee.company
    def author_employee(self, obj): return obj.author.employee.user

    list_display = ('author_company', 'author_employee', 'title','body','publish_date','likes')
    list_display_links = ('author_company','author_employee', 'title','body','publish_date','likes')
    list_filter = ('author__employee__company', 'author__employee__user') 
    
class PostsPublicAdmin(admin.ModelAdmin):
    def likes(self,obj):
        return PostsPublicLikes.objects.filter(post_id=obj.post_id).count()

    list_display = ('author', 'title','body','publish_date','likes')
    list_display_links = ('author', 'title','body','publish_date','likes')
    list_filter = ('author', ) 

class PostsPublicCommentsAdmin(admin.ModelAdmin):
    list_display = ('post', 'commentor','comment','date')
    list_display_links = ('post', 'commentor','comment','date')
    list_filter = ('post', ) 

class PostsPrivateCommentsAdmin(admin.ModelAdmin):
    def company(self, obj):        return obj.post.author.employee.company
    def author_name(self, obj):    return obj.post.author.employee.user
    def commentor_name(self, obj): return obj.commentor.employee.user
    def post_title(self, obj):     return obj.post.title

    list_display = ('company','author_name','post_title', 'commentor_name','comment','date')
    list_display_links = ('company','author_name','post_title', 'commentor_name','comment','date')
    list_filter = ('post__author__employee__company', 'post__author__employee__user') 
 

class PostsPrivateLikesAdmin(admin.ModelAdmin):
    list_display = ('post', 'like',)
    list_display_links = ('post', 'like',)
    list_filter = ('post', ) 

class PostsPublicLikesAdmin(admin.ModelAdmin):
    list_display = ('post', 'like',)
    list_display_links = ('post', 'like',)
    list_filter = ('post', ) 

admin.site.register(PostsPrivate,PostsPrivateAdmin)
admin.site.register(PostsPrivateLikes,PostsPrivateLikesAdmin)
admin.site.register(PostsPrivateComments,PostsPrivateCommentsAdmin)

admin.site.register(PostsPublic,PostsPublicAdmin)
admin.site.register(PostsPublicLikes,PostsPublicLikesAdmin)
admin.site.register(PostsPublicComments,PostsPublicCommentsAdmin)