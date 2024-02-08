from django import views
from django.urls import include, path
from .views import *

urlpatterns = [
    path("userscredential",  UsersCredentialView.as_view()),
    path("users",            UsersView.as_view()),
    path("user/<slug:pk>",   UserView.as_view()),
    
    path("companies",        CompaniesView.as_view()),
    path("companies/<slug:pk>", CompanyView.as_view()),

    path("workrequests",     WorkRequestsView.as_view()),
    path("workrequests/<slug:user>",  GetWorkRequestView.as_view()),
    path("workson",          WorksOnView.as_view()),

    path("postpublic",       AllPostsPublicView.as_view()),
    path("postpublic/<slug:user>",     PostsPublicView.as_view()),
    path("postprivate",      AllPostsPrivateView.as_view()),
    path("postprivate/<slug:company>", PostsPrivateView.as_view()),
    path("postprivate/<int:id>", IdPostsPrivateView.as_view()),

    path("postpubliccomments",  AllPublicCommentView.as_view()),
    path("postpubliccomments/<slug:post>",  PublicCommentView.as_view()),
    path("postprivatecomments", AllPrivateCommentView.as_view()),
    path("postprivatecomments/<slug:post>", PrivateCommentView.as_view()),

    path("publiclikes", AllPublicLikesView.as_view()),
    path("publiclikes/<slug:post>", PublicLikesView.as_view()),
    path("privatelikes", AllPrivateLikesView.as_view()),
    path("privatelikes/<slug:post>", PrivateLikesView.as_view()),
]
