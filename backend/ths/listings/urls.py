from django.urls import path

from .views import ListingList

from .views import AssignmentCreateView

urlpatterns = [
    path("", ListingList.as_view()),
    path("assignments", AssignmentCreateView.as_view()),
]
