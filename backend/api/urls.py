from django import views
from django.urls import include, path
from .views import *

urlpatterns = [
    path("userscredential",  UsersCredentialView.as_view()),
    path("users",            UsersView.as_view()),
    path("users/<slug:user>",   UserView.as_view()),
    
    path("companies",        CompaniesView.as_view()),
    path("companies/<slug:company>", CompanyView.as_view()),

    path("address/<int:id>", AddressView.as_view()),

    path("education/<int:user>",  EducationView.as_view()),
    path("university/<int:user>", UniversityView.as_view()),

    path("workrequests_comp/<int:company>",       WorkRequestsView.as_view()),
    path("workrequests/<int:user>",               GetWorkRequestView.as_view()),
    path("workrequests/<int:user>/<int:company>", UserCompanyRequestView.as_view()),
    path("workson",                               WorksOnView.as_view()),
    path("workson/<int:company>",                 Employees.as_view()),

    path("friend_requests/",         FriendRequest.as_view()),
    path("friend_requests/<int:id>", FriendRequestList.as_view()),
    path("allfriend_requests",       AllFriendsRequestsView.as_view()),

    path("active_friends/<int:user_id>", ActiveFriendsView.as_view()),

    path("unread_messages_count/<int:user>", UnreadMessagesCountView.as_view()),
    path("unread_messages/<int:user>/<int:friend>", UnreadMessagesView.as_view()),
    path("conversation/<int:user>/<int:friend>", ConversationView.as_view()),
    path("conversations/<int:user>", ConversationsView.as_view()),
    path("chats/<int:user>",                     ChatsView.as_view()),

    path("group/<int:group>", GroupView.as_view()),
    path("groups/<int:user>", GroupsView.as_view()),
    path("group_members/<int:group>", GroupMembersView.as_view()),
    path("group_admins/<int:id>", GroupAdminsView.as_view()),
    path("group_not_members/<int:group>/<int:company>", GroupNotMembersView.as_view()),
    path("group_chat/<int:group>",  GroupsChatView.as_view()),

    # path("friends",             FriendsView.as_view()),
    path("friends/<slug:user>", FriendsList.as_view()),
    path("all_friends",         AllFriendsView.as_view()),

    path("postpublic",             AllPostsPublicView.as_view()),
    path("postpublic/<slug:user>", PostsPublicView.as_view()),
    path("postpublic/<int:user>",  IdPostsPublicView.as_view()),
    path("post_public/<int:post>", PostPublicView.as_view()),
    
    path("postprivate",                AllPostsPrivateView.as_view()),
    path("postprivate/<slug:company>", PostsPrivateView.as_view()),
    path("postprivate/<int:id>",       IdPostsPrivateView.as_view()),
    path("post_private/<int:post>",    PostPrivateView.as_view()),

    path("postpubliccomments",              AllPublicCommentView.as_view()),
    path("postpubliccomments/<slug:post>",  PublicCommentView.as_view()),
    path("postprivatecomments",             AllPrivateCommentView.as_view()),
    path("postprivatecomments/<slug:post>", PrivateCommentView.as_view()),

    path("publiclikes",              AllPublicLikesView.as_view()),
    path("publiclikes/<slug:post>",  PublicLikesView.as_view()),
    path("privatelikes",             AllPrivateLikesView.as_view()),
    path("privatelikes/<slug:post>", PrivateLikesView.as_view()),

    path("projects/<int:company>",          ProjectsView.as_view()),
    path("project_admins/<int:id>",    ProjectAdminsView.as_view()),
    path("project_divisions/<int:id>", ProjectDivisionView.as_view()),
    path("project_assign/<int:division>",   ProjectAssignView.as_view()),
    path("projects_requests_assign/<int:request_id>", ProjectRequestAssignView.as_view())
]
