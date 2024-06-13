from django.urls import path

from .views import ListingList

from .views import ListingList, ListingAssignmentCreate

urlpatterns = [
    path("", ListingList.as_view()),
    path("<int:pk>/assignments/", ListingAssignmentCreate.as_view()),
]
