from django.urls import path

from .views import ListingDetail, ListingList

urlpatterns = [
    path("", ListingList.as_view()),
    path("<int:pk>/", ListingDetail.as_view()),
]
