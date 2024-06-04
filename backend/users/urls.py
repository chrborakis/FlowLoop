from django import views
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings

from . import views
from backend.users.views import *

urlpatterns = [
    path("user/<slug:slug>",    UserProfile.as_view()),
    path("user_cred/<int:user>",    views.user_cred),
    path("friends/<slug:user>",   views.friends),
    path("education/<int:user>",  views.education),
    path("university/<int:user>", views.university),
    path("friend_requests/", views.friend_requests),
    path("friend_requests/<int:id>", views.friend_requests_list),
]
