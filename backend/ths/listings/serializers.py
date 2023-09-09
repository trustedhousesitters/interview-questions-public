from rest_framework import serializers

from .models import Listing, Assignment


class AssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Assignment
        fields = ["start_date", "end_date", "listing"]


class ListingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Listing
        fields = ["first_name", "last_name", "pets", "assignments", "created_at"]
