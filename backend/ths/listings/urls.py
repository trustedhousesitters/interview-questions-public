from django.urls import path

from .views import ListingList, AssigmentCreateView

urlpatterns = [
    path("", ListingList.as_view()),
    path("assignments/", AssigmentCreateView.as_view()),
]

