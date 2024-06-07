from django.http import HttpResponseBadRequest
from django.shortcuts import get_object_or_404
from rest_framework import generics, status
from rest_framework.response import Response

from .models import Listing, Assignment
from django.db import transaction

from .pagination import StandardResultsSetPagination
from .serializers import ListingSerializer, AssignmentSerializer

class ListingList(generics.ListAPIView):
    queryset = Listing.objects.all().prefetch_related('pets', 'assignments')
    serializer_class = ListingSerializer
    # If you want to use the custom pagination class for this view specifically:
    pagination_class = StandardResultsSetPagination


class AssigmentCreateView(generics.CreateAPIView):
    serializer_class = AssignmentSerializer

    def create(self, request, *args, **kwargs):
        start_date = request.data.get("start_date")
        end_date = request.data.get("end_date")
        listing_id = request.data.get("listing")
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            # Get the listing object from the request data
            listing = get_object_or_404(Listing, pk=listing_id)

            # This is done here as a business logic to check for overlapping and to ensure integrity, locks are applied
            with transaction.atomic():
                overlapping_assignments = Assignment.objects.select_for_update().filter(
                    listing=listing,
                    start_date__lt=end_date,
                    end_date__gt=start_date
                )

                if overlapping_assignments.exists():
                    return Response(
                        {"detail": "This assignment overlaps with an existing assignment."},
                        status=status.HTTP_400_BAD_REQUEST
                    )

        except (Listing.DoesNotExist, ValueError):
            return Response(
                {"detail": "Invalid listing ID or overlapping assignment."},
                status=status.HTTP_400_BAD_REQUEST
            )

        return super().create(request, *args, **kwargs)
