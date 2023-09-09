from rest_framework import generics, status
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Listing, Assignment
from .paginations import ListingPagination
from .serializers import ListingSerializer, AssignmentSerializer


class ListingList(generics.ListAPIView):
    serializer_class = ListingSerializer
    pagination_class = ListingPagination

    def get_queryset(self):
        queryset = Listing.objects.prefetch_related('assignments', 'pets').all()
        return queryset


class AssignmentListCreateView(generics.ListCreateAPIView):
    """
        A view for creating and listing assignments associated with a specific listing.

        Attributes:
            serializer_class (class): The serializer class for assignments.
            lookup_url_kwarg (str): The URL keyword argument for listing_id.

        Methods:
            get_queryset: Get the queryset of assignments for the specified listing.
            create: Handle the creation of a new assignment.
            perform_create: Create a new assignment associated with the listing.
        """
    serializer_class = AssignmentSerializer
    lookup_url_kwarg = "listing_id"

    def get_queryset(self):
        listing = get_object_or_404(Listing, id=self.kwargs.get(self.lookup_url_kwarg))
        return Assignment.objects.filter(listing=listing)

    def create(self, request, *args, **kwargs):
        data = request.data
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def perform_create(self, serializer):
        serializer.save()
