from django.contrib.auth.mixins import LoginRequiredMixin
from rest_framework import generics

from .models import Listing
from .serializers import ListingSerializer, AssignmentSerializer


class ListingListCreate(LoginRequiredMixin, generics.ListAPIView):
    serializer_class = ListingSerializer
    queryset = Listing.objects.all()


class CreateAssignment(LoginRequiredMixin, generics.CreateAPIView):
    serializer_class = AssignmentSerializer
