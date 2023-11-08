from django.contrib import admin

from apps.users.models import *
from apps.companies.models import *
from .models import *

admin.site.register(Phone)
admin.site.register(Address)


# admin.site.register(Posts)