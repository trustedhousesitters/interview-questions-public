from rest_framework import generics

from .models import Listing
from .pagination import StandardResultsSetPagination
from .serializers import ListingSerializer


class ListingList(generics.ListAPIView):
    queryset = Listing.objects.all().prefetch_related('pets', 'assignments')
    serializer_class = ListingSerializer
    # If you want to use the custom pagination class for this view specifically:
    pagination_class = StandardResultsSetPagination
