from django.urls import path

from . import views

urlpatterns = [
    path("", views.leClub, name="leClub"),
    path("nos-activites/", views.nosActivitees, name="nosActivitees"),
    path("infos-pratiques/", views.infoPratiques, name="infoPratiques"),
    path("sorties/", views.sorties, name="sorties"),
    path("evpt/", views.evpt, name="evpt"),
    path("calendrier/", views.calendrier, name="calendrier"),
    path("medias/", views.medias, name="medias"),
]