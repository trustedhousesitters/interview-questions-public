from django.urls import path

from listings.views import ListingListCreate

urlpatterns = [path("", ListingListCreate.as_view())]
