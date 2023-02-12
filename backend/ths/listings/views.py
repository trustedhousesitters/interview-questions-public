from django.contrib.auth.mixins import LoginRequiredMixin
from rest_framework import generics

from .models import Listing
from .serializers import ListingSerializer, AssignmentSerializer


class ListingList(LoginRequiredMixin, generics.ListAPIView):
    serializer_class = ListingSerializer
    # Most Recent first.
    queryset = Listing.objects.all().order_by("-id")


class CreateAssignment(LoginRequiredMixin, generics.CreateAPIView):
    serializer_class = AssignmentSerializer
