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
    class Meta:
        model = WorksOn
        fields = (
            'id',
            'employee_id',
            'is_admin'
        )


class PostsPrivateSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostsPrivate
        fields = (
            'post',
            'slug',
            'author',
            'title',
            'body',
            'publish_date',
            'image'
        )

class PostsPrivateLikesSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostsPrivateLikes
        fields = (
            'post',
            'like'
        )

class PostsPrivateCommentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostsPrivateComments
        fields = (
            'post_id',
            'commentor',
            'comment',
            'date'
        )







class PostsPublicLikesSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostsPublicLikes
        fields = (
            'post',
            'like'
        )

class PostsPublicCommentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostsPublicComments
        fields = (
            'post',
            'commentor',
            'comment',
            'date'
        )

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
            'id':   str(obj.author.user_id),
            'name': str(obj.author)
        }