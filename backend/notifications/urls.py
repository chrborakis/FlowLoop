

from django import views
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings

from . import views
from backend.users.views import *

urlpatterns = [
    path("<int:user>", views.notifications),
    path("requests/<int:user>", views.requests_notifications)
]
