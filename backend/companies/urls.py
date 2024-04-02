from django import views
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings

from . import views
from backend.views import *

urlpatterns = [
    path("company/<slug:company>",   views.company),
    path("address/<int:pk>",      views.address),
    path("staff/<int:company>",        views.staff),
    
    path("workrequests/<int:id>", views.workrequests),
    path("id_workrequests/<int:user>/<int:company>", views.id_workrequests),
]
