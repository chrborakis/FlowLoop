import datetime
from rest_framework import serializers
from apps.chats.models import PrivateChat
from apps.companies.models import Companies, WorkRequests, WorksOn
from apps.groups.models import GroupAdmins, GroupChat, GroupMembers, Groups
from apps.models import Address
from apps.posts.models import PostsPrivate, PostsPrivateComments, PostsPrivateLikes, PostsPublic, PostsPublicComments, PostsPublicLikes
from apps.projects.models import ProjectDivision,ProjectAdmin, ProjectRequestAssign, Projects, ProjectAssign
from apps.users.models import *
from rest_framework import serializers, fields

class UsersCredentialSerializer(serializers.ModelSerializer):
    class Meta:
        model = UsersCredentials
        fields = ('user_id','email','password','active')

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
            'id':    obj.user.user_id,
            'name':  str(obj.user.firstname) + ' ' + str(obj.user.lastname),
            'slug':  str(obj.user.slug),
            'image': str(user_image)
        }
    
    def get_company_info(self,obj):
        return {
            'id':    obj.company.company_id,
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
            'id':    obj.employee.user.user_id,
            'name':  str(obj.employee.user.firstname) + ' ' + str(obj.employee.user.lastname),
            'slug':  str(obj.employee.user.slug),
            'image': str(obj.employee.user.image)
        }

    def get_company(self,obj):
        company = obj.employee.company
        if company:
            return {
                'id': company.company_id,
                'name': str(company),
                'slug': str(company.slug),
                'image': str(company.image)
            }
        else:
            return None
    
class FriendsSerializer(serializers.ModelSerializer):
    person_info = serializers.SerializerMethodField()
    friend_info = serializers.SerializerMethodField()
    symmetric_id = serializers.SerializerMethodField()
    class Meta:
        model = Friends
        fields = (
            'id',
            'person',
            'person_info',
            'friend',
            'friend_info',
            'symmetric_id',
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
    
    def get_symmetric_id(self, obj):
        opposite_entry = Friends.objects.filter(person=obj.friend, friend=obj.person).first()
        if opposite_entry:
            return opposite_entry.id
        else:
            return None
    
class FriendsRequestsSerializer(serializers.ModelSerializer):
    sender_info = serializers.SerializerMethodField()
    receiver_info = serializers.SerializerMethodField()
    class Meta:
        model = FriendRequests
        fields = (
            'id',
            'sender',
            'sender_info',
            'receiver',
            'receiver_info',
            'status'
        )
    def get_sender_info( self, obj):
        return{
            'name':  str(obj.sender),
            'slug':  str(obj.sender.slug),
            'image': str(obj.sender.image)
        }
    
    def get_receiver_info( self, obj):
        return{
            'name':  str(obj.receiver),
            'slug':  str(obj.receiver.slug),
            'image': str(obj.receiver.image)
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
            'user_id':    obj.author.user_id,
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
            'company_id':   obj.author.employee.company.company_id,
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
            'id':    obj.like.user_id,
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
            'id':    obj.like.employee.user.user_id,
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
            'id':    obj.commentor.user_id,
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
            'id':   obj.commentor.employee.user.user_id,
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
    admin_info = serializers.SerializerMethodField()    
    class Meta:
        model = ProjectAdmin
        fields = (
            "id",
            "project",
            "admin",
            "admin_info"
        ) 

    def get_admin_info(self, obj):
        try:
            return {
                'id'  : obj.admin.employee.user.user_id,
                'name': str(obj.admin.employee.user),
                'slug': str(obj.admin.employee.user.slug),
                'image':str(obj.admin.employee.user.image),
            }
        except ProjectAdmin.DoesNotExist:
            return None

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
                'id'  : project_admin.admin.employee.user.user_id,
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
            "user",
        )

    def get_user( self, obj):
        user = obj.assign.employee.user
        return{
            "participant_id": obj.participant_id,
            'id'  : user.user_id,
            'name': str(user),
            'slug': str(user.slug),
            'image':str(user.image),
            'work_id': obj.assign.id
        }

class ProjectRequestAssignSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    class Meta:
        model = ProjectRequestAssign
        fields = (
            "id",
            "division",
            "employee",
            "status",
            "user",
        )

    def get_user( self, obj):
        user = obj.employee.employee.user
        return{
            'id'  : user.user_id,
            'name': str(user),
            'slug': str(user.slug),
            'image':str(user.image),
            'work_id': obj.employee.id
        }

class ProjectDivisionSerializer(serializers.ModelSerializer):
    assign = serializers.SerializerMethodField()    
    requests = serializers.SerializerMethodField()
    class Meta:
        model = ProjectDivision
        fields = (
            "division",
            "project",
            "title",
            "description",
            "file",
            "assign",
            "requests"
        )

    def get_assign(self, obj):
        try:
            project_assign = ProjectAssign.objects.get(division=obj.division)
            user = project_assign.assign.employee.user
            return{
                'participant_id': project_assign.participant_id,
                'id'  : user.user_id,
                'name': str(user),
                'slug': str(user.slug),
                'image':str(user.image),
                'work_id': project_assign.assign.id
            }
        except ProjectAssign.DoesNotExist:
            return None

    def get_requests(self, obj):
        try:
            project_requests = ProjectRequestAssign.objects.filter(division=obj.division)
            if project_requests.exists():
                user_list = []
                for request in project_requests:
                    user = request.employee.employee.user
                    user_list.append({
                        'id': request.id,
                        'work_id': request.employee.id,
                        'name': str(user),
                        'slug': str(user.slug),
                        'image': str(user.image),
                    })
                return user_list  # Moved outside the loop
            else:
                return None
        except ProjectRequestAssign.DoesNotExist as e:
            print(str(e))
            return None
    
class PrivateChatSerializer(serializers.ModelSerializer):
    sender_info   = serializers.SerializerMethodField()    
    receiver_info = serializers.SerializerMethodField()
    class Meta:
        model = PrivateChat
        fields = (
            "message_id",
            "sender",
            "sender_info",
            "receiver",
            "receiver_info",
            "message",
            "send_date",
            "read"
        )

    def get_sender_info(self, obj):
        return{
            'id'  : obj.sender.person.user_id,
            'name': str(obj.sender.person),
            'slug': str(obj.sender.person.slug),
            'image':str(obj.sender.person.image)
        }
    def get_receiver_info(self, obj):
        return{
            'id'  : obj.receiver.person.user_id,
            'name': str(obj.receiver.person),
            'slug': str(obj.receiver.person.slug),
            'image':str(obj.receiver.person.image)
        }

class GroupsSerializer(serializers.ModelSerializer):
    members = serializers.SerializerMethodField()
    admins  = serializers.SerializerMethodField()
    class Meta:
        model = Groups
        fields = (
            "group_id",
            "name",
            "company",
            "members",
            "admins"
        )

    def get_admins(self, obj):
        try:
            admins = GroupAdmins.objects.filter(group=obj.group_id)
            if admins.exists():
                admins_list = []
                for member in admins:
                    user = member.admin
                    admins_list.append({
                        'admin_id': member.id,
                        'user_id': user.employee.user.user_id,
                        'name': str(user.employee.user),
                        'slug': str(user.employee.user.slug),
                    })
                return admins_list
            else:
                return None
        except GroupMembers.DoesNotExist as e:
            print(str(e))
            return None

    def get_members(self, obj):
        try:
            members = GroupMembers.objects.filter(group=obj.group_id)
            if members.exists():
                members_list = []
                for member in members:
                    user = member.member
                    members_list.append({
                        'member': member.id,
                        'user_id': user.employee.user.user_id,
                        'name': str(user.employee.user),
                        'slug': str(user.employee.user.slug),
                        'image': str(user.employee.user.image),
                        'occupation': str(user.employee.user.occupation), 
                    })
                return members_list
            else:
                return None
        except GroupMembers.DoesNotExist as e:
            print(str(e))
            return None
        
class GroupMembersSerializer(serializers.ModelSerializer):
    group_name = serializers.SerializerMethodField()
    member_info = serializers.SerializerMethodField()
    class Meta:
        model = GroupMembers
        fields = (
            "id",
            "group",
            "group_name",
            "member",
            "member_info"
        )

    def get_group_name(self,obj):
        return str(obj.group.name)


    def get_member_info(self, obj):
        user = obj.member.employee.user
        return{
            'member': obj.id,
            'user_id': user.user_id,
            'name': str(user),
            'slug': str(user.slug),
            'image': str(user.image),
            'occupation': str(user.occupation), 
        }

class GroupAdminsSerializer(serializers.ModelSerializer):
    class Meta:
        model = GroupAdmins
        fields = (
            "id",
            "group",
            "admin",
        )
    
class GroupChatSerializer(serializers.ModelSerializer):
    sender_info = serializers.SerializerMethodField()
    
    class Meta:
        model = GroupChat 
        fields = (
            "id",
            "group",
            "sender",
            "message",
            "file",
            "send_date",
            "sender_info"
        )

    def get_sender_info( self, obj):
        user = obj.sender.member.employee
        print(user)
        return{
            'id'  : user.user.user_id,
            'name': str(user.user),
            'slug': str(user.user.slug),
            'image':str(user.user.image),
            'work_id': str(user.id)
        }
    
    def get_sender_info(self, obj):
        try:
            user = obj.sender.member.employee
            return {
                'id': user.user.user_id,
                'name': str(user.user),
                'slug': str(user.user.slug),
                'image': str(user.user.image),
                'work_id': str(user.id)
            }
        except AttributeError: 
            return {
                'id': None,
                'name': "Removed User",
            }