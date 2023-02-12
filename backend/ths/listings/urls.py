from django.conf import settings
from django.urls import path
from django.views.decorators.cache import cache_page

from listings.views import ListingList, CreateAssignment

# Add caching to the page such that it will cache the
urlpatterns = [
    path(
        "listings/",
        cache_page(settings.CACHE_REFRESH_MINUTES * 60)(ListingList.as_view()),
        name="get_all_listings",
    ),
    path("assignments/", CreateAssignment.as_view(), name="create_assignment"),
]
