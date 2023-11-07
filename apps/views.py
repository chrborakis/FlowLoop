from django.views import View
from django.shortcuts import render

# class Main(View):
#     template_name = "socialnetwork/base.html"


def my_view(request):
    return render(request, "socialnetwork/base.html")