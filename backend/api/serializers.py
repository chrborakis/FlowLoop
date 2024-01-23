from rest_framework import serializers
from apps.companies.models import Companies, WorkRequests, WorksOn
from apps.posts.models import PostsPrivate, PostsPrivateComments, PostsPrivateLikes, PostsPublic, PostsPublicComments, PostsPublicLikes
from apps.users.models import *

class UsersCredentialSerializer(serializers.ModelSerializer):
    class Meta:
        model = UsersCredentials
        fields = ('user_id','email','password')

class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = (
            # 'user',
            'firstname',
            'midname',
            'lastname',
            'slug',
            'occupation',
            'gender',
            'image',
            'phone',
            'about',
            'country'
        )

class CompaniesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Companies
        fields = (
            'company_id',
            'company_name',
            'slug',
            'description',
            'image',
            'establishment_date',
            'creation_date',
            'address_id',
            'phone'
        )

class WorkRequestsSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkRequests
        fields = (
            'id',
            'user_id',
            'company_id',
            'status'
        )

class WorksOnSerializer(serializers.ModelSerializer):
    company = serializers.SerializerMethodField()
    class Meta:
        model = WorksOn
        fields = (
            'id',
            'employee_id',
            'is_admin',
            'company'
        )

    def get_company(self,obj):
        return{
            'id':   str(obj.employee.company.company_id),
            'name': str(obj.employee.company),
        }
    
class PostsPublicSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()

    # likes = PostsPublicLikesSerializer(many=True, read_only=True)
    # total_likes = serializers.SerializerMethodField()
    # comments = PostsPublicCommentsSerializer(many=True, read_only=True)

    class Meta:
        model = PostsPublic
        fields = (
            'post_id','slug',
            # 'author',
            'user','title','body',
            'publish_date','image'
        )

    def get_user(self,obj):
        return {
            'user_id':    str(obj.author.user_id),
            'user_name':  str(obj.author),
            'user_slug':  str(obj.author.slug),
            'user_image': str(obj.author.image)
        }

class PostsPrivateSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    class Meta:
        model = PostsPrivate
        fields = (
            'post_id',
            'slug',
            'user',
            'title',
            'body',
            'publish_date',
            'image'
        )

    def get_user(self,obj):
        return {
            'company_id':   str(obj.author.employee.company.company_id),
            'company_name': str(obj.author.employee.company),
            'user_id':      str(obj.author.employee.user_id),
            'user_name':    str(obj.author.employee.user),
        }
    

class PostsPublicLikesSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    class Meta:
        model = PostsPublicLikes
        fields = (
            'post',
            'user'
        )
    def get_user( self, obj):
        return{
            'id':    str(obj.like.user_id),
            'name':  str(obj.like),
            'slug':  str(obj.like.slug),
            'image': str(obj.like.image)
        }

class PostsPrivateLikesSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    class Meta:
        model = PostsPrivateLikes
        fields = (
            'post',
            'like',
            'user'
        )

    def get_user(self,obj):
        return {
            'id':    str(obj.like.employee.user.user_id),
            'name':  str(obj.like.employee.user),
            'slug':  str(obj.like.employee.user.slug),
            'image': str(obj.like.employee.user.image),
        }
    
class PostsPublicCommentsSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    class Meta:
        model = PostsPublicComments
        fields = (
            'id',
            'post',
            'commentor',
            'user',
            'comment',
            'date'
        )
    def get_user( self, obj):
        return{
            'id':    str(obj.commentor.user_id),
            'name':  str(obj.commentor),
            'slug':  str(obj.commentor.slug),
            'image': str(obj.commentor.image)
        }

class PostsPrivateCommentsSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    class Meta:
        model = PostsPrivateComments
        fields = (
            'id',
            'post',
            'commentor',
            'user',
            'comment',
            'date'
        )

    def get_user( self, obj):
        return{
            'id':   str(obj.commentor.employee.user.user_id),
            'name': str(obj.commentor.employee.user),
        }

class PublicLikesSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostsPublicLikes
        fields = (
            "id",
            "post",
            "like"
        )



class PrivateLikesSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostsPrivateLikes
        fields = (
            "id",
            "post",
            "like"
        )
