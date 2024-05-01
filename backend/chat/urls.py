from django import views
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings

from . import views
from backend.views import *

urlpatterns = [
    path("conversation/<int:user>/<int:friend>",   views.conversation),
]
