from django import views
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings

from . import views
from backend.views import *

urlpatterns = [
    path("projects/<int:id>",  views.projects),

    # id company - getDivisions || id project - addDivision
    path("divisions/<int:id>", views.divisions),
    path("assign/<int:division>", views.assign),
    path("assign_request/<int:request_id>", views.assign_request),
    path("admin", views.admin)
]