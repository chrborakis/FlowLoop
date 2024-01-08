from django.urls import include, path
from .views import *

urlpatterns = [
    path("users-signup", UsersCredentialView.as_view()),
    path("users", UsersView.as_view()),
    path('', include("api.authentication.urls")),
]
