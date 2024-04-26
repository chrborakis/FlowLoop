import json
from django.http import Http404, HttpResponse, JsonResponse
from django.views import View
from django.shortcuts import get_list_or_404, render
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import *
from apps.users.models import *
from rest_framework import viewsets
from django.views.generic import ListView
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import action
from django.db.models import Q
from rest_framework.views import APIView
from rest_framework.response import Response
from django.utils.decorators import method_decorator

class UsersView(APIView):
    def get( self, request):
        output = [{
            "user_id": str(output.user),
            "firstname": output.firstname,
            "midname": output.midname if output.midname is not None else '',
            "lastname": output.lastname,
            "occupation": output.occupation,
            "gender": output.gender,
            "image": str(output.image.url) if output.image else '',
            "phone": str(output.phone),
            "about": output.about,
            "country": output.country,
            }for output in Users.objects.all()
        ]
        return Response(output)
    
    def post( self, request):
        print("IN USERS API")
        serializer = UsersSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class UserView(APIView):
    def get(self, request, user):
        if user.isdigit():
            user_inst = get_object_or_404(Users, pk=user)
        else:
            user_inst = get_object_or_404(Users, slug=user)
        serializer = UsersSerializer(user_inst)
        return Response(data=serializer.data, status=status.HTTP_200_OK)
    
    def patch(self, request, user):
        print("DATA IN API: ", request.data)
        try:
            if user.isdigit():
                user_instance = get_object_or_404(Users, pk=user)
            else:
                user_instance = get_object_or_404(Users, slug=user)
        except Users.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        
        updated_fields = {}
        for field_name, value in request.data.items():
            if hasattr(user_instance, field_name) and getattr(user_instance, field_name) != value:
                updated_fields[field_name] = value
    
        try:
            serializer = UsersSerializer(user_instance, data=updated_fields, partial=True)
            if serializer.is_valid():
                serializer.save()
                print("User updated successfully")
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print("Error:", e)
            return Response({"error": "An error occurred"}, status=status.HTTP_400_BAD_REQUEST)

        
class UsersCredentialView(APIView):
    def get( self, request):
        output = [{
            "email": output.email,
            "password": output.password
            }for output in UsersCredentials.objects.all()
        ]
        return Response(output)
    
    def post( self, request):
        serializer = UsersCredentialSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class AddressView(APIView):
    def get(self, request, id):
        try:
            instance = get_object_or_404(Address, id=id)
            serializers = AddressSerializer(instance)
            return Response(serializers.data)
        except Http404:
            return Response({'error': 'Address instance not found.'}, status=404)    
    def post( self, request, id):
        serializer = AddressSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def put(self, request, id):
        print("DATA IN API: ", request.data)
        try:
            address_inst = Address.objects.get(pk=id)
        except Address.DoesNotExist:
            return Response({"error": "Address not found"}, status=status.HTTP_404_NOT_FOUND)    
        try:
            serializer = AddressSerializer(address_inst, data=request.data)
            if serializer.is_valid():
                serializer.save()
                print("Address updated successfully")
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print("Error:", e)
            return Response({"error": "An error occurred"}, status=status.HTTP_400_BAD_REQUEST)
        
class EducationView(APIView):
    def get(self, request, user):
        try:
            instance = get_object_or_404(EducationDetails, user_id=user)
            serializers = EducationSerializer(instance)
            return Response(serializers.data)
        except Http404:
            return Response({'error': 'Education instance not found.'}, status=404)    
    def post( self, request, user):
        print("data : ", request.data)
        serializer = EducationSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def patch(self, request, user):
        try:
            education_inst = EducationDetails.objects.get(pk=user)
        except EducationDetails.DoesNotExist: return Response({"error": "Education "+str(user)+" not found"}, status=status.HTTP_404_NOT_FOUND)
        try:
            serializer = EducationSerializer(education_inst, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print("Error:", e)
            return Response({"error": "An error occurred"}, status=status.HTTP_400_BAD_REQUEST)
    
class UniversityView(APIView):
    def get(self, request, user):
        try:
            instances = get_list_or_404(UniversityDetails, user_id=user)
            serializers = UniversitySerializer(instances, many=True)
            return Response(serializers.data)
        except Http404:
            return Response({'error': 'University instance not found.'}, status=404)    
    
    def post( self, request):
        serializer = UniversitySerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
        
class CompaniesView(APIView):
    def get(self, request):
        try:
            output = [{
                "company_id": output.company_id,
                "company_name": output.company_name,
                "slug": output.slug,
                "description": output.description,
                "image": str(output.image.url) if output.image else '',
                "creation_date": output.creation_date,
                "address": str(output.address),
                "phone": str(output.phone)
                }for output in Companies.objects.all()
            ]
            return Response(output)
        except UnicodeDecodeError:
            return Response({"error": "UnicodeDecodeError occurred while processing data"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def post(self, request, *args, **kwargs):
        serializer = CompaniesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class CompanyView(APIView):    
    def get(self, request, company):
        if company.isdigit():
            instance = get_object_or_404(Companies, pk=company)
        else:
            instance = get_object_or_404(Companies, slug=company)
        serializers = CompaniesSerializer(instance)
        # print(serializers.data)
        return Response(serializers.data)

    def post( self, request, company):
        print("DATA IN API: ", request.data)
        serializer = CompaniesSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
    def patch(self, request, company):
        print("DATA IN API: ", request.data)
        try:
            if company.isdigit():
                company_instance = Companies.objects.get(pk=company)
            else:
                company_instance = Companies.objects.get(slug=company)
        except Companies.DoesNotExist:
            return Response({"error": "Company not found"}, status=status.HTTP_404_NOT_FOUND)
        
        updated_fields = {}
        for field_name, value in request.data.items():
            if hasattr(company_instance, field_name) and getattr(company_instance, field_name) != value:
                updated_fields[field_name] = value
        for field_name, value in updated_fields.items():
            setattr(company_instance, field_name, value)
    
        try:
            serializer = CompaniesSerializer(company_instance, data=updated_fields, partial=True)
            if serializer.is_valid():
                serializer.save()
                print("Company updated successfully")
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print("Error:", e)
            return Response({"error": "An error occurred"}, status=status.HTTP_400_BAD_REQUEST)


class WorkRequestsView(APIView):
    def get( self, request, company):
        instances = get_list_or_404(WorkRequests.objects.filter( company=company, status="P"))
        serializers = WorkRequestsSerializer(instances, many=True)        
        return Response(serializers.data)
    
    def post( self, request):
        print(request.data)
        serializer = WorkRequestsSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GetWorkRequestView(APIView):
    def get( self, request, user):
        instance = get_object_or_404(WorkRequests, user=user)
        serializers = WorkRequestsSerializer(instance)
        return Response(serializers.data)
    
    def post( self, request, user):
        print("DATA IN API -> ", request.data)
        serializer = WorkRequestsSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserCompanyRequestView(APIView):
    def get( self, request, user, company):
        instance = get_object_or_404(WorkRequests, user=user, company=company)
        serializers = WorkRequestsSerializer(instance)
        return Response(serializers.data)

class WorksOnView(APIView):
    def get( self, request):
        output = [{
            'id': output.id,
            'employee': {
                'user': {
                    'id':   output.employee.user_id,
                    'name': str(output.employee.user)
                },
                'company': {
                    'id':   output.employee.company.company_id,
                    'name': output.employee.company.company_name,
                },
            },
            'is_admin': output.is_admin
        }for output in WorksOn.objects.all()]
        return Response(output)
    
    def post( self, request):
        serializer = WorksOnSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class Employees(APIView):
    def get( self, request, company):
        try:
            instances = get_list_or_404(WorksOn.objects.filter( employee__company=company).order_by('employee__user__slug'))
            serializers = WorksOnSerializer(instances, many=True)        
            return Response(serializers.data)
        except Http404:
            return Response({'error': 'Employees not found.'}, status=404)    

class ActiveFriendsView(APIView):
    def get(self, request, user_id):
        try:
            instances = get_list_or_404(Friends.objects.filter( person=user_id, friend__user__active=True).order_by('friend__slug'))
            serializers = FriendsSerializer(instances, many=True)
            return Response(serializers.data)
        except Http404:
            return Response({'error': 'Active Friends not found.'}, status=404) 

class FriendRequestList(APIView):
    def get( self, request, id):
        try:
            instances = get_list_or_404(FriendRequests.objects.filter( receiver=id, status="P"))
            serializers = FriendsRequestsSerializer(instances, many=True)        
            return Response(serializers.data)
        except Http404:
            return Response({'error': 'FriendRequests instances not found.'}, status=404)    
    def post( self, request):
        serializer = FriendsRequestsSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class FriendRequest(APIView):
    def get( self, request):
        sender   = request.data.get("sender")
        receiver = request.data.get("receiver")
        try:
            # request.query_params
            instance = get_object_or_404(FriendRequests, sender=sender, receiver=receiver)
            print("INSTANCE: ",instance)
            serializers = FriendsRequestsSerializer(instance)
            return Response(serializers.data)
        except Http404:
            return Response({'error': 'FriendRequests instance not found.'}, status=404)  
    def post( self, request):
        print("IN API" ,request.data)
        serializer = FriendsRequestsSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class AllFriendsRequestsView(APIView):
    def get( self, request):
        instances = get_list_or_404( FriendRequests)
        serializers = FriendsRequestsSerializer(instances, many=True)        
        return Response(serializers.data)
    def post( self, request):
        pass
        
# class FriendsView(APIView):
#     def get( self, request, user, friend):
#         instance = get_object_or_404(Friends, user1=user, friend=friend)
#         serializers = FriendsSerializer(instance)
#         return Response(serializers.data)
    
#     def post( self, request, user):
#         print("DATA IN API -> ", request.data)
#         serializer = FriendsSerializer(data = request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_200_OK)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class FriendsList(APIView):
    def get( self, request, user):
        instances = get_list_or_404(Friends, person__slug=user)
        serializers = FriendsSerializer(instances, many=True)        
        return Response(serializers.data)

class AllFriendsView(APIView):
    def get( self, request):
        instances = get_list_or_404(Friends)
        serializers = FriendsSerializer(instances, many=True)        
        return Response(serializers.data)
    def post( self, request):
        pass

class AllPostsPublicView(APIView):
    def get( self, request):
        instances = get_list_or_404(PostsPublic.objects.order_by('-publish_date'))
        serializers = PostsPublicSerializer(instances, many=True)        
        return Response(serializers.data)

    def post( self, request):
        print("API:", request.data)
        serializer = PostsPublicSerializer( data = request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class PostsPublicView(APIView):    
    def get( self, request, user):
        instances = get_list_or_404(PostsPublic.objects.filter( author__slug=user).order_by('-publish_date'))
        serializers = PostsPublicSerializer(instances, many=True)        
        return Response(serializers.data)

    def post( self, request):
        print("API:", request.data)
        serializer = PostsPublicSerializer( data = request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class IdPostsPublicView(APIView):
    def get( self, request, user):
        instances = get_list_or_404(PostsPublic.objects.filter( author=user).order_by('-publish_date'))
        serializers = PostsPublicSerializer(instances, many=True)        
        return Response(serializers.data)

    def post( self, request):
        print("2DATA IN API", request.data)
        serializer = PostsPublicSerializer( data = request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AllPostsPrivateView(APIView):
    def get( self, request):
        instances = get_list_or_404(PostsPrivate.objects.order_by('-publish_date'))
        serializers = PostsPrivateSerializer(instances, many=True)        
        return Response(serializers.data)

    def post( self, request):
        serializer = PostsPrivateSerializer( data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
# CALL ON EVERY NEW POST TO UPDATE THE ARRAY OF POSTS
class PostPublicView(APIView):
    def get( self, request, post):
        instance = get_object_or_404(PostsPublic, post_id=post)
        serializers = PostsPublicSerializer(instance)
        return Response(serializers.data)
    def patch( self, request, post):
        try:
            post_inst = PostsPublic.objects.get(pk=post)
        except PostsPublic.DoesNotExist: return Response({"error": "PostPublic "+str(post)+" not found"}, status=status.HTTP_404_NOT_FOUND)
        try:
            serializer = PostsPublicSerializer(post_inst, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print("Error:", e)
            return Response({"error": "An error occurred"}, status=status.HTTP_400_BAD_REQUEST)
        


    
# CALL ON EVERY NEW POST TO UPDATE THE ARRAY OF POSTS
class PostPrivateView(APIView):
    def get( self, request, post):
        instance = get_object_or_404(PostsPrivate, post_id=post)
        serializers = PostsPrivateSerializer(instance)
        return Response(serializers.data)
    def patch( self, request, post):
        try:
            post_inst = PostsPrivate.objects.get(pk=post)
        except PostsPrivate.DoesNotExist: return Response({"error": "PostsPrivate "+str(post)+" not found"}, status=status.HTTP_404_NOT_FOUND)
        try:
            serializer = PostsPrivateSerializer(post_inst, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print("Error:", e)
            return Response({"error": "An error occurred"}, status=status.HTTP_400_BAD_REQUEST)
        

class PostsPrivateView(APIView):    
    def get( self, request, company):
        instances = PostsPrivate.objects.filter(author__employee__company__slug = company)
        serializers = PostsPrivateSerializer(instances, many=True)
        return Response(serializers.data)

    def post( self, request, company):
        serializer = PostsPrivateSerializer( data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class IdPostsPrivateView(APIView):
    def get( self, request, id):
        instances = PostsPrivate.objects.filter(author__employee__company = id)
        serializers = PostsPrivateSerializer(instances, many=True)
        return Response(serializers.data)

    def post( self, request, company):
        serializer = PostsPrivateSerializer( data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        
class AllPublicCommentView(APIView):
    def get( self, request):
        output = [{
            'post': str(output.post),
            'commentor': str(output.commentor),
            'comment': str(output.comment),
            'date': str(output.date),
        }for output in PostsPublicComments.objects.all()
    ]
        return Response(output)
    
    def post( self, request):
        print("data : ", request.data)
        serializer = PostsPublicCommentsSerializer( data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class AllPrivateCommentView(APIView):
    def get( self,request):
        output = [{
            'post': str(output.post),
            'commentor': str(output.commentor),
            'comment': str(output.comment),
            'date': str(output.date),
        }for output in PostsPrivateComments.objects.all()
    ]
        return Response(output)
    
    def post( self, request):
        print("data : ", request.data)
        serializer = PostsPrivateCommentsSerializer( data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PublicCommentView(APIView):
    def get( self, request, post):
        instances = PostsPublicComments.objects.filter(post = post)
        serializers = PostsPublicCommentsSerializer(instances, many=True)
        return Response(serializers.data)
    
    def post( self, request):
        print("data : ", request.data)
        serializer = PostsPublicCommentsSerializer( data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class PrivateCommentView(APIView):
    def get( self, request, post):
        instances = PostsPrivateComments.objects.filter(post = post)
        serializers = PostsPrivateCommentsSerializer(instances, many=True)
        return Response(serializers.data)
    
    def post( self, request):
        print("data : ", request.data)
        serializer = PostsPrivateCommentsSerializer( data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AllPublicLikesView(APIView):
    def get( self, request):
        output = [{
            "id": output.id,
            "post_id": output.post_id,
            "like_id": output.like_id,
        }for output in PostsPublicLikes.objects.all()
    ]
        print(output)
        return Response(output)
    
    def post( self, request):
        print("data : ", request.data)
        serializer = PublicLikesSerializer( data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AllPrivateLikesView(APIView):
    def get( self, request):
        output = [{
            "id": output.id,
            "post_id": output.post_id,
            "like_id": output.like_id,
        }for output in PostsPrivateLikes.objects.all()
    ]
        print(output)
        return Response(output)
    
    def post( self, request):
        print("data : ", request.data)
        serializer = PrivateLikesSerializer( data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PublicLikesView(APIView):
    def get( self, request, post):
        instances = PostsPublicLikes.objects.filter(post = post)
        serializers = PostsPublicLikesSerializer(instances, many=True)
        return Response(serializers.data)
    
    def post( self, request):
        print("data : ", request.data)
        serializer = PostsPublicLikesSerializer( data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PrivateLikesView(APIView):
    def get( self, request, post):
        instances = PostsPrivateLikes.objects.filter(post = post)
        serializers =PostsPrivateLikesSerializer(instances, many=True)
        return Response(serializers.data)
    
    def post( self, request):
        print("data : ", request.data)
        serializer = PostsPrivateLikesSerializer( data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class ProjectsView(APIView):
    def get( self, request, company):
        instances = get_list_or_404(Projects.objects.filter( company=company))
        serializers = ProjectsSerializer(instances, many=True)        
        return Response(serializers.data)

    def post( self, request, company):
        serializer = ProjectsSerializer( data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, company):
        id=company
        try:
            project_inst = Projects.objects.get(pk=id)
        except Projects.DoesNotExist: return Response({"error": "Project "+str(id)+" not found"}, status=status.HTTP_404_NOT_FOUND)
        try:
            serializer = ProjectsSerializer(project_inst, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print("Error:", e)
            return Response({"error": "An error occurred"}, status=status.HTTP_400_BAD_REQUEST)
        

class ProjectAdminsView(APIView):
    def get( self, request, id):
        instances = get_list_or_404(Projects)
        serializers = ProjectAdminSerializer(instances, many=True)        
        return Response(serializers.data)

    def post( self, request, id):
        serializer = ProjectAdminSerializer( data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
        ProjectDivisionView
class ProjectDivisionView(APIView):
    def get( self, request, id):
        instances = get_list_or_404(ProjectDivision, project=id)
        serializers = ProjectDivisionSerializer(instances, many=True)        
        return Response(serializers.data)

    def post( self, request, id):
        serializer = ProjectDivisionSerializer( data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def patch(self, request, id):
        try:
            div_inst = ProjectDivision.objects.get(pk=id)
        except ProjectDivision.DoesNotExist:
            return Response({"error": "ProjectDivision not found"}, status=status.HTTP_404_NOT_FOUND)
    
        try:
            serializer = ProjectDivisionSerializer(div_inst, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": "An error occurred"}, status=status.HTTP_400_BAD_REQUEST)
        
@method_decorator(csrf_exempt, name='dispatch')
class ProjectAssignView(APIView):
    def get( self, request, division):
        try:
            instance = get_object_or_404(ProjectAssign, division=division)
            serializers = ProjectAssignSerializer(instance)        
            return Response(serializers.data)
        except Http404 as e:
            return Response(str(e), status=status.HTTP_404_NOT_FOUND)

    def post( self, request, division):
        serializer = ProjectAssignSerializer( data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ProjectRequestAssignView(APIView):
    def get( self, request, request_id):
        instances = get_list_or_404(ProjectRequestAssign)
        serializers = ProjectRequestAssignSerializer(instances, many=True)        
        return Response(serializers.data)
    def patch( self, request, request_id):
        try:
            req_inst = ProjectRequestAssign.objects.get(pk=request_id)
        except ProjectRequestAssign.DoesNotExist: return Response({"error": "ProjectRequestAssign "+str(request_id)+" not found"}, status=status.HTTP_404_NOT_FOUND)
        try:
            serializer = ProjectRequestAssignSerializer(req_inst, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print("Error:", e)
            return Response({"error": "An error occurred"}, status=status.HTTP_400_BAD_REQUEST)