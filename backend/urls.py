from django import views
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
from . import views

from backend.views import *

urlpatterns = [
    path('api/',            include('backend.api.urls')),
    path('authentication/', include('backend.authentication.urls')),

    path("user/<slug:slug>", UserProfile.as_view()),

    path("postpublic/<slug:post>",    GetPostPublic.as_view()),
    path("postpublic",               AllPostsPublic.as_view()),

    path("postprivate/<slug:company>",   GetPostPrivate.as_view()),
    path("postprivate/<slug:company>/<slug:post>",              AllPostPrivate.as_view()),

    path("publiccomments/<slug:slug>",  GetPublicComments.as_view()),
    path("privatecomments/<slug:slug>", GetPrivateComments.as_view()),

    path("publiclikes/<slug:slug>",   GetPublicLikes.as_view()),
    path("privatelikes/<slug:slug>",  GetPrivateLikes.as_view())
]
# + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)