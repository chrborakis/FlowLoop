from django import views
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings

from . import views
from backend.views import *

urlpatterns = [
    path('api/',       include('backend.api.urls')),
    path('users/',     include('backend.users.urls')),
    path('companies/', include('backend.companies.urls')),
    path('posts/',     include('backend.posts.urls')), 
    path('projects/',  include('backend.projects.urls')),
    path('chat/',      include('backend.chat.urls')),
    path('groups/',include('backend.groups.urls')),

    # path('ws/test/', TextRoomConsumer.as_asgi()),
    # path('ws/',             include(websocket_urlpatterns)),
    path('authentication/', include('backend.authentication.urls')),

    path("search_users/<str:name>", views.search_users),
    path("search_companies/<str:name>", views.search_companies),
    path('user_info/<int:user_id>', views.user_info),
    path('active_friends/<int:user_id>', views.active_friends),
]