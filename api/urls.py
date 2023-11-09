from django.urls import path
from .views import *

urlpatterns = [
    path("users-signup", UsersCredentialView.as_view()),
    path("users", UsersView.as_view()),
]
