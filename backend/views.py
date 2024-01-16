import json
from django.http import HttpResponse, JsonResponse
from django.shortcuts import get_list_or_404, render
from rest_framework.views import APIView
from rest_framework.response import Response

from backend.api.serializers import *
from apps.users.models import *
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import action

@action(detail=True, methods=['post'])
class UserProfile(APIView):
    def get(self,request,slug,*args,**kwargs):
        try:
            instance = get_object_or_404(Users, slug=slug)
            serializers = UsersSerializer(instance)
            return JsonResponse({
                'message': 'User Data Fetched succesfully',
                'data': serializers.data,
                'status': status.HTTP_200_OK
            })
        except Exception as err:
            return JsonResponse({
                'message': err
            })
        
@action(detail=True, methods=['get'])
class GetPostPublic(APIView):
    def get( self, request, *args, **kwargs):
        try:
            instances = get_list_or_404(PostsPublic.objects.all())
            serializers = PostsPublicSerializer(instances, many=True)        

            return JsonResponse({
                'message': 'Posts Public Fetched succesfully',
                'data': serializers.data,
                'status': status.HTTP_200_OK
            })
        
        except ValueError as err:
            return JsonResponse({
                'message': str(err),
                'status': status.HTTP_400_BAD_REQUEST
            })

        except Exception as err:
            return JsonResponse({
                'message': str(err),
                'status': status.HTTP_500_INTERNAL_SERVER_ERROR
            })