from rest_framework import generics
from rest_framework.pagination import PageNumberPagination

from .models import Listing
from .serializers import ListingSerializer


class ListingPagination(PageNumberPagination):
    page_size = 20


class ListingList(generics.ListAPIView):
    serializer_class = ListingSerializer
    queryset = Listing.objects.prefetch_related('pets', 'assignments').order_by('id')
    pagination_class = ListingPagination


class ListingDetail(generics.RetrieveAPIView):
    serializer_class = ListingSerializer
    queryset = Listing.objects.prefetch_related('pets', 'assignments').all()
