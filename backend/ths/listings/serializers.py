from datetime import date

from django.utils import timezone
from rest_framework import serializers

from .models import Listing, Assignment


class ListingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Listing
        fields = ["id", "first_name", "last_name", "pets", "assignments"]


class AssignmentSerializer(serializers.ModelSerializer):
    listing = ListingSerializer(read_only=True)

    class Meta:
        model = Assignment
        fields = ["id", "start_date", "end_date", "listing"]

    @staticmethod
    def validate_start_date(value: date) -> date:
        """
        Validates that the start date is in the future.
        """
        if value < timezone.now().date():
            raise serializers.ValidationError("Assignment date should be in the future.")
        return value

    def validate_dates_overlap(self, start_date: date, end_date: date) -> None:
        """
        Validates that the start date and end date don't overlap.
        """
        listing = self.context["listing"]

        overlapping_assignments = Assignment.objects.filter(
            listing=listing,
            start_date__lt=end_date,
            end_date__gt=start_date
        )

        if overlapping_assignments.exists():
            raise serializers.ValidationError("Assignment dates overlap with an existing assignment.")

    @staticmethod
    def validate_dates_range(start_date: date, end_date: date) -> None:
        """
        Validates that the start date occurs before the end date.
        """
        if start_date > end_date:
            raise serializers.ValidationError("Start date should be before end date.")

    def validate(self, attrs: dict) -> dict:
        """
        Performs additional validations on multiple fields
        """
        start_date = attrs.get('start_date')
        end_date = attrs.get('end_date')

        self.validate_dates_overlap(start_date, end_date)
        self.validate_dates_range(start_date, end_date)

        return super().validate(attrs)
