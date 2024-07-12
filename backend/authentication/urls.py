from django.urls import path
from . import views
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path("login",    views.login, name='login'),
    path("register", views.signup, name="register")
]


    # path("login", views.login_view, name='login'),
    # path("register", views.register_view, name="register")