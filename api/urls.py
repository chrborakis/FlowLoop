from django import views
from django.urls import include, path
from .views import *

urlpatterns = [
    path("users",            UsersView.as_view()),
    path("user/<slug:slug>", UserProfile.as_view()),
    path("userscredential",  UsersCredentialView.as_view()),
    path("authentication/",  include('api.authentication.urls')),
]
