from django.urls import include, path
from .views import *

urlpatterns = [
    path("users",           UsersView.as_view()),
    path("userscredential", UsersCredentialView.as_view()),
]
