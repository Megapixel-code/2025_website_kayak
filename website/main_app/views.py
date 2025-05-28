from django.shortcuts import render, redirect
from .models import *

# Create your views here.

def home(request):
    page = content.page.objects.get(id=0)
    return render(request, "le_club.html", {
        'page':page,
    })


