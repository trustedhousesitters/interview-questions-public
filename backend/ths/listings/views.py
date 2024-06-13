from rest_framework import generics
from rest_framework.generics import get_object_or_404
from rest_framework.pagination import PageNumberPagination

from .models import Listing, Assignment
from .serializers import ListingSerializer, AssignmentSerializer


class ListingList(generics.ListAPIView):
    serializer_class = ListingSerializer
    queryset = Listing.objects.prefetch_related("pets", "assignments")
    pagination_class = PageNumberPagination


class ListingAssignmentCreate(generics.CreateAPIView):
    serializer_class = AssignmentSerializer
    queryset = Assignment.objects.all()

    def get_serializer_context(self):
        return {"listing": get_object_or_404(Listing, pk=self.kwargs.get("pk"))}

    def perform_create(self, serializer):
        listing = serializer.context.get("listing")
        serializer.save(listing=listing)
