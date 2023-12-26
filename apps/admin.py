from django.contrib import admin

from apps.users.models import *
from apps.companies.models import *
from .models import *

admin.site.register(Address)


