from django import views
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings

from . import views
from backend.posts.views import *

urlpatterns = [
    path("postpublic/<slug:user>/", views.post_public),
    path("postprivate/<slug:company>/", views.post_private),

    path("postpubliccomments/<slug:post>",  views.public_comments, name='public_comments'),
    path("postprivatecomments/<slug:post>", views.private_comments,name='private_comments'),

    path("postpubliclikes/<slug:post>",   views.public_likes),
    path("postprivatelikes/<slug:post>",  views.private_likes),
]