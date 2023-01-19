from django.urls import path

from .views import ListingList

urlpatterns = [path("", ListingList.as_view())]
