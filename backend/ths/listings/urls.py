from django.urls import path

from .views import ListingList, AssignmentListCreateView

urlpatterns = [
    path("", ListingList.as_view()),
    path("assignments/<int:listing_id>/", AssignmentListCreateView.as_view()),
]
