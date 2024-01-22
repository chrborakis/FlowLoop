from django import views
from django.urls import include, path
from .views import *

urlpatterns = [
    path("users",            UsersView.as_view()),
    path("userscredential",  UsersCredentialView.as_view()),
    path("companies",        CompaniesView.as_view()),
    path("workrequests",     WorkRequestsView.as_view()),
    path("workson",          WorksOnView.as_view()),
    path("postprivate",      PostsPrivateView.as_view()),
    path("postpublic",       PostsPublicView.as_view()),
    path("postpubliccomments", PostPublicCommentView.as_view())

    
]
