from django.urls import path

from .views import AssigmentCreate, ListingList

urlpatterns = [
    path("", ListingList.as_view()),
    path("assignments/", AssigmentCreate.as_view()),
]
