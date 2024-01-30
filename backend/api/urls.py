from django import views
from django.urls import include, path
from .views import *

urlpatterns = [
    path("userscredential",  UsersCredentialView.as_view()),
    path("users",            UsersView.as_view()),
    path("user/<slug:pk>",            UserView.as_view()),
    
    path("companies",        CompaniesView.as_view()),
    path("workrequests",     WorkRequestsView.as_view()),
    path("workson",          WorksOnView.as_view()),

    path("postprivate",      PostsPrivateView.as_view()),
    path("postpublic",       PostsPublicView.as_view()),

    path("postpubliccomments/", PostPublicCommentView.as_view()),
    path("postprivatecomments/", PostPrivateCommentView.as_view()),

    path("publiclikes/", PublicLikesView.as_view()),
    path("privatelikes/", PrivateLikesView.as_view())
]
