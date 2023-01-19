from rest_framework import generics

from .models import Listing
from .serializers import ListingSerializer


class ListingList(generics.ListAPIView):
    serializer_class = ListingSerializer
    queryset = Listing.objects.all()
