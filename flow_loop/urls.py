from django.contrib import admin
from django.urls import path, re_path, include
from django.conf.urls.static import static
from django.conf import settings
from backend.authentication import views

# from flow_loop import routing

urlpatterns = [
    path('admin/', admin.site.urls),
    path('backend/', include('backend.urls')),
    path('', include("frontend.urls")),

    re_path('login',      views.login),
    re_path('signup',     views.signup),
    
    # re_path(r'^.*',         include("frontend.urls")),
# ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
]

# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# Catch-all pattern to include frontend URLs
urlpatterns += [re_path(r'^.*', include("frontend.urls"))]