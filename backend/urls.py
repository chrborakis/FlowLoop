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

    path("user/<slug:slug>",    UserProfile.as_view()),
    path("company/<slug:pk>",   views.company),

    path("workrequests",   views.workrequests),

    path("postpublic/<slug:post>",   SinglePostPublic.as_view()),
    path("postpublic", views.post_public),

    path("postprivate/<slug:company>/<slug:post>",    SinglePostPrivate.as_view()),
    # path("postprivate/<slug:company>",  PostsPrivate.as_view()),
    path("postprivate/<slug:company>", views.post_private),

    path("publiccomments/<slug:post>",  views.public_comments, name='public_comments'),
    path("privatecomments/<slug:post>", views.private_comments,name='private_comments'),

    path("publiclikes/<slug:post>",   views.public_likes),
    path("privatelikes/<slug:post>",  views.private_likes),
]
# + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
