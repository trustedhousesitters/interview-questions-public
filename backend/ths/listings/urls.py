from django.urls import path

from .views import ListingList, CreatingAssignment

urlpatterns = [
    path("", ListingList.as_view()),
    path("create-assignment/",CreatingAssignment.as_view(), name="create-assignment"),
    ]
