from django.shortcuts import render, redirect
from .models import *

# ===================== MAIN PAGES =====================
def leClub(request):
    return renderBasePageContent(request, 0)

def nosActivitees(request):
    return renderBasePageContent(request, 1)

def infoPratiques(request):
    return renderBasePageContent(request, 2)

def sorties(request):
    return renderBasePageContent(request, 3)

def evpt(request):
    return renderBasePageContent(request, 4)

def calendrier(request):
    return renderBasePageContent(request, 5)

def medias(request):
    return renderBasePageContent(request, 6)

def renderBasePageContent(request, page_id):
    page = content.Page.objects.get(id=page_id)
    page_buttons = content.Page_Button.objects.filter(page_fk=page)

    return render(request, "page_content.html", {
        'page':page,
        'page_buttons':page_buttons,
    })