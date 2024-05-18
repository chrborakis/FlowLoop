from django import views
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings

from . import views
from backend.views import *

urlpatterns = [
    path("<int:user>",   views.groups),
    path("group/<int:group>",   views.group),
    path("conversation/<int:group>", views.conversation),
    path("members/<int:id>", views.members),
]
