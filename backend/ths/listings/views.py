from datetime import date

from django.http import HttpResponseBadRequest
from rest_framework import generics

from .models import Listing
from .serializers import AssignmentSerializer, ListingSerializer


class ListingList(generics.ListAPIView):
    serializer_class = ListingSerializer
    queryset = Listing.objects.all().prefetch_related("assignments", "pets")


class AssigmentCreate(generics.CreateAPIView):
    serializer_class = AssignmentSerializer

    def create(self, request, *args, **kwargs):
        start_date = request.data.get("start_date")
        end_date = request.data.get("end_date")

        # Ensure assignments are in the future
        try:
            # DRF defaults to iso format
            if date.fromisoformat(start_date) <= date.today():
                raise ValueError
        except (TypeError, ValueError):
            return HttpResponseBadRequest()

        # Refuse overlapping assingments
        try:
            listing = Listing.objects.get(pk=request.data.get("listing"))
            if listing.assignments.filter(
                end_date__gte=start_date,
                start_date__lte=end_date,
            ).exists():
                raise ValueError
        except (Listing.DoesNotExist, ValueError):
            return HttpResponseBadRequest()

        return super().create(request, *args, **kwargs)
