import datetime
from rest_framework import serializers
from apps.companies.models import Companies, WorkRequests, WorksOn
from apps.models import Address
from apps.posts.models import PostsPrivate, PostsPrivateComments, PostsPrivateLikes, PostsPublic, PostsPublicComments, PostsPublicLikes
from apps.projects.models import ProjectDivision,ProjectAdmin, Projects, ProjectAssign
from apps.users.models import *
from rest_framework import serializers, fields

class UsersCredentialSerializer(serializers.ModelSerializer):
    class Meta:
        model = UsersCredentials
        fields = ('user_id','email','password')

    def validate(self, data):
        email = data.get('email')
        errors = {}
        if UsersCredentials.objects.filter(email=email).exists():
            errors['email'] = "Email already exists."
        if errors:
            raise serializers.ValidationError(errors)
        return data

class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = '__all__'

    def update(self, instance, validated_data):
        phone = validated_data.get('phone')
        if phone and Users.objects.exclude(pk=instance.pk).filter(phone=phone).exists():
            raise serializers.ValidationError("Phone number already exists")
        return super().update(instance, validated_data)
    
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
            'address',
            'phone'
        )
    def validate(self, data):
        company_name = data.get('company_name')
        phone = data.get('phone')

        errors = {}

        if Companies.objects.filter(company_name=company_name).exists():
            errors['company_name'] = "Company name already exists."
        if Companies.objects.filter(phone=phone).exists():
            errors['phone'] = "Phone already exists."
        if errors:
            raise serializers.ValidationError(errors)
        return data
    


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = (
            'id',
            'country',
            'city',
            'street'
        )


class WorkRequestsSerializer(serializers.ModelSerializer):
    user_info = serializers.SerializerMethodField()
    company_info = serializers.SerializerMethodField()
    class Meta:
        model = WorkRequests
        fields = (
            'id',
            'user',
            'user_info',
            'company_info',
            'company',
            'status'
        )

    def get_user_info(self,obj):
        user_image = obj.user.image
        if user_image is None:
            user_image = "user_image/dummy-user.png "
        return {
            'id':    str(obj.user.user_id),
            'name':  str(obj.user.firstname) + ' ' + str(obj.user.lastname),
            'slug':  str(obj.user.slug),
            'image': str(user_image)
        }
    
    def get_company_info(self,obj):
        return {
            'id':    str(obj.company.company_id),
            'name':  str(obj.company.company_name),
            'slug':  str(obj.company.slug),
            'image': str(obj.company.image)
        }

class WorksOnSerializer(serializers.ModelSerializer):
    employee = serializers.SerializerMethodField()
    company = serializers.SerializerMethodField()
    class Meta:
        model = WorksOn
        fields = (
            'id',
            'employee_id',
            'is_admin',
            'company',
            'employee'
        )

    def get_employee(self, obj):
        return{
            'id':    str(obj.employee.user.user_id),
            'name':  str(obj.employee.user.firstname) + ' ' + str(obj.employee.user.lastname),
            'slug':  str(obj.employee.user.slug),
            'image': str(obj.employee.user.image)
        }

    def get_company(self,obj):
        company = obj.employee.company
        if company:
            return {
                'id': str(company.company_id),
                'name': str(company),
                'slug': str(company.slug),
                'image': str(company.image)
            }
        else:
            return None
    
class FriendsSerializer(serializers.ModelSerializer):
    person_info = serializers.SerializerMethodField()
    friend_info = serializers.SerializerMethodField()
    class Meta:
        model = Friends
        fields = (
            'person',
            'person_info',
            'friend',
            'friend_info',
        )
    def get_person_info( self, obj):
        return{
            'name':  str(obj.person),
            'slug':  str(obj.person.slug),
            'image': str(obj.person.image)
        }
    
    def get_friend_info( self, obj):
        return{
            'name':  str(obj.friend),
            'slug':  str(obj.friend.slug),
            'image': str(obj.friend.image)
        }
    
class FriendsRequestsSerializer(serializers.ModelSerializer):
    user1_info = serializers.SerializerMethodField()
    request_info = serializers.SerializerMethodField()
    class Meta:
        model = FriendRequests
        fields = (
            'user1',
            'user1_info',
            'request',
            'request_info',
            'status'
        )
    def get_user1_info( self, obj):
        return{
            'name':  str(obj.user1),
            'slug':  str(obj.user1.slug),
            'image': str(obj.user1.image)
        }
    
    def get_request_info( self, obj):
        return{
            'name':  str(obj.request),
            'slug':  str(obj.request.slug),
            'image': str(obj.request.image)
        }

class PostsPublicSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()

    # likes = PostsPublicLikesSerializer(many=True, read_only=True)
    # total_likes = serializers.SerializerMethodField()
    # comments = PostsPublicCommentsSerializer(many=True, read_only=True)

    class Meta:
        model = PostsPublic
        fields = (
            'post_id',
            # 'slug',
            'author',
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
            # 'slug',
            'author',
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
            'company_slug': str(obj.author.employee.company.slug),
            'user_id':      str(obj.author.employee.user_id),
            'user_name':    str(obj.author.employee.user),
            'user_slug':    str(obj.author.employee.user.slug),
            'user_image':    str(obj.author.employee.user.image)
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
            'slug':  str(obj.commentor.employee.user.slug),
            'image': str(obj.commentor.employee.user.image)
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

class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = EducationDetails
        fields = (
            "id",
            "user",
            "name",
            "graduation",
        )

class UniversitySerializer(serializers.ModelSerializer):
    class Meta:
        model = UniversityDetails
        fields = (
            "id",
            "user",
            "name",
            "graduation",
            "degree"
        )
class ProjectAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectAdmin
        fields = (
            "id",
            "project",
            "admin",
        ) 

class ProjectsSerializer(serializers.ModelSerializer):
    admin = serializers.SerializerMethodField()    
    class Meta:
        model = Projects
        fields = (
            "project_id",
            "company",
            "title",
            "description",
            "phase",
            "start_date",
            "finish_date",
            "admin"
        )

    def get_admin(self, obj):
        try:
            project_admin = ProjectAdmin.objects.get(project_id=obj.project_id)
            return {
                'id'  : str(project_admin.admin.employee.user.user_id),
                'name': str(project_admin.admin.employee.user),
                'slug': str(project_admin.admin.employee.user.slug),
                'image':str(project_admin.admin.employee.user.image),
            }
        except ProjectAdmin.DoesNotExist:
            return None
      

class ProjectAssignSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    class Meta:
        model = ProjectAssign
        fields = (
            "participant_id",
            "division",
            "assign",
            "user"
        )

    def get_user( self, obj):
        user = obj.assign.employee.user
        return{
            "participant_id": str(obj.participant_id),
            'id'  : str(user.user_id),
            'name': str(user),
            'slug': str(user.slug),
            'image':str(user.image),
            'work_id': str(obj.assign.id)
        }

class ProjectDivisionSerializer(serializers.ModelSerializer):
    assign = serializers.SerializerMethodField()    
    class Meta:
        model = ProjectDivision
        fields = (
            "division",
            "project",
            "title",
            "description",
            "file",
            "assign"
        )

    def get_assign(self, obj):
        try:
            project_assign = ProjectAssign.objects.get(division=obj.division)
            user = project_assign.assign.employee.user
            return{
                'participant_id': str(project_assign.participant_id),
                'id'  : str(user.user_id),
                'name': str(user),
                'slug': str(user.slug),
                'image':str(user.image),
                'work_id': str(project_assign.assign.id)
            }
        except ProjectAssign.DoesNotExist:
            return None






