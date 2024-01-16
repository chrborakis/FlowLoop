from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings

from backend.views import *

urlpatterns = [
    path('api/',            include('backend.api.urls')),
    path('authentication/', include('backend.authentication.urls')),

    path("user/<slug:slug>", UserProfile.as_view()),
    path("postspublic",      GetPostPublic.as_view())
]
# + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
