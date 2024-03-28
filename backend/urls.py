from django import views
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings

from . import views
from backend.views import *

urlpatterns = [
    path('api/',            include('backend.api.urls')),
    # path('ws/test/', TextRoomConsumer.as_asgi()),

    # path('ws/',             include(websocket_urlpatterns)),
    path('authentication/', include('backend.authentication.urls')),

    path("user/<slug:slug>",    UserProfile.as_view()),
    path("company/<slug:company>",   views.company),
    path("address/<int:pk>",    views.address),

    path("education/<int:user>",  views.education),
    path("university/<int:user>", views.university),

    path("workrequests/<int:id>", views.workrequests),
    path("id_workrequests/<int:user>/<int:company>", views.id_workrequests),

    path("friend_requests/", views.friend_requests),
    path("friend_requests/<int:id>", views.friend_requests_list),

    path("postpublic/<slug:user>/", views.post_public),
    path("postprivate/<slug:company>/", views.post_private),

    path("postpubliccomments/<slug:post>",  views.public_comments, name='public_comments'),
    path("postprivatecomments/<slug:post>", views.private_comments,name='private_comments'),

    path("postpubliclikes/<slug:post>",   views.public_likes),
    path("postprivatelikes/<slug:post>",  views.private_likes),

]
