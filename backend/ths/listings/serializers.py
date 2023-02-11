import datetime as dt
from typing import Any

from django.db.models import Q, QuerySet
from rest_framework import serializers

from listings.models import Listing, Assignment


class ListingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Listing
        fields = ["first_name", "last_name", "pets", "assignments"]


class AssignmentSerializer(serializers.ModelSerializer):
    """
    Serializer for `Assignment` model instances.
    """

    class Meta:
        model = Assignment
        fields = "__all__"

    def get_overlaps(self, data: dict[str:Any]) -> QuerySet[Assignment]:
        """
        Get any existing overlaps for this listing.
        """
        start_date = data.get('start_date')
        end_date = data.get('end_date')
        # Assignment starts before and ends during or after
        starts_before = Q(start_date__lt=start_date, end_date__gt=start_date)
        # Assignment starts during
        starts_during = Q(start_date__gte=start_date, start_date__lte=end_date)
        return Assignment.objects.select_related('listing').filter(
            starts_before | starts_during,
            listing=data.get('listing')
        )

    def validate(self, data: dict[str, Any]) -> dict[str, Any]:
        """
        Override object level validation to check for overlaps.
        """
        overlaps = self.get_overlaps(data)
        if not overlaps:
            return data

        errors = []
        for overlap in overlaps:
            message = f"Overlapping Assignment found starts: {overlap.start_date} ends: {overlap.end_date}."
            errors.append(serializers.ValidationError(message))

        raise serializers.ValidationError(errors)

    def validate_start_date(self, value: dt.date) -> dt.date:
        """
        Validate that the start-date is after today.

        Check the following:
            * Assignment starts tomorrow or later.
            * The assignment doesn't overlap with any existing assignments for this listing.
        """
        if not value > dt.date.today():
            raise serializers.ValidationError("Start date must be after today.")
        return value
