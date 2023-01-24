from rest_framework import serializers

from .models import Listing


class ListingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Listing
        fields = ["first_name", "last_name", "pets", "assignments"]
