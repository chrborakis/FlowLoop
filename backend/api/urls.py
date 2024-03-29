from django import views
from django.urls import include, path
from .views import *

urlpatterns = [
    path("userscredential",  UsersCredentialView.as_view()),
    path("users",            UsersView.as_view()),
    path("user/<slug:pk>",   UserView.as_view()),
    
    path("companies",        CompaniesView.as_view()),
    path("companies/<slug:company>", CompanyView.as_view()),

    path("address/<int:id>", AddressView.as_view()),

    path("education/<int:user>",  EducationView.as_view()),
    path("university/<int:user>", UniversityView.as_view()),

    path("workrequests_comp/<int:company>",  WorkRequestsView.as_view()),
    path("workrequests/<int:user>",     GetWorkRequestView.as_view()),
    path("workrequests/<int:user>/<int:company>",     UserCompanyRequestView.as_view()),
    path("workson",          WorksOnView.as_view()),

    path("friend_requests/",   FriendRequest.as_view()),
    path("friend_requests/<int:id>",   FriendRequestList.as_view()),
    path("allfriend_requests", AllFriendsRequestsView.as_view()),
    path("friends",          FriendsView.as_view()),
    path("all_friends",      AllFriendsView.as_view()),

    path("postpublic",       AllPostsPublicView.as_view()),
    path("postpublic/<slug:user>", PostsPublicView.as_view()),
    path("postpublic/<int:user>",     IdPostsPublicView.as_view()),
    path("post_public/<int:post>",     PostPublicView.as_view()),
    
    path("postprivate",      AllPostsPrivateView.as_view()),
    path("postprivate/<slug:company>", PostsPrivateView.as_view()),
    path("postprivate/<int:id>", IdPostsPrivateView.as_view()),
    path("post_private/<int:post>",     PostPrivateView.as_view()),

    path("postpubliccomments",  AllPublicCommentView.as_view()),
    path("postpubliccomments/<slug:post>",  PublicCommentView.as_view()),
    path("postprivatecomments", AllPrivateCommentView.as_view()),
    path("postprivatecomments/<slug:post>", PrivateCommentView.as_view()),

    path("publiclikes", AllPublicLikesView.as_view()),
    path("publiclikes/<slug:post>", PublicLikesView.as_view()),
    path("privatelikes", AllPrivateLikesView.as_view()),
    path("privatelikes/<slug:post>", PrivateLikesView.as_view()),
]
