from rest_framework.generics import CreateAPIView,ListAPIView
from .models import Assignment
from .serializers import CreatingAssignmentSerializer
from rest_framework.pagination import PageNumberPagination
from rest_framework import generics

from .models import Listing
from .serializers import ListingSerializer

class StandardResultsSetPagination(PageNumberPagination):
    page_size = 5

class ListingList(generics.ListAPIView):
    serializer_class = ListingSerializer
    pagination_class = StandardResultsSetPagination

    def get_queryset(self):
        return Listing.objects.prefetch_related("assignments","pets")

class CreatingAssignment(CreateAPIView):
    queryset = Assignment.objects.all()
    serializer_class = CreatingAssignmentSerializer