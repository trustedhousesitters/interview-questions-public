from datetime import date, timedelta

from rest_framework import serializers
from django.utils import timezone

from .models import Listing, Assignment


class ListingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Listing
        fields = ["first_name", "last_name", "pets", "assignments"]


from datetime import date, timedelta
from rest_framework import serializers
from .models import Listing, Assignment

class AssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Assignment
        fields = ['start_date', 'end_date', 'listing']

    def validate(self, data):
        if data['start_date'] < timezone.now().date() + timedelta(days=1):
            raise serializers.ValidationError("The assignment must start tomorrow or later.")

        if data['end_date'] < data['start_date']:
            raise serializers.ValidationError("The end date must be after the start date.")

        overlapping_assignments = Assignment.objects.filter(
            listing=data['listing'],
            start_date__lt=data['end_date'],
            end_date__gt=data['start_date']
        )
        if overlapping_assignments.exists():
            raise serializers.ValidationError("The assignment overlaps with an existing assignment.")

        return data

