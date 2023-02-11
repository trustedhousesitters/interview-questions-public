import datetime as dt

import factory
import pytest
from rest_framework import serializers

from listings.serializers import AssignmentSerializer
from listings.tests.factories import ListingFactory, AssignmentFactory


@pytest.mark.django_db
class TestAssignmentSerializer:
    """
    Test for Assignment Serializer.
    """

    @pytest.mark.parametrize(
        "start_delta,end_delta", [(-1, -1), (-1, 0), (-1, 1), (0, 0), (1, -1), (1, 1)]
    )
    def test_get_overlaps(self, start_delta, end_delta):
        """
        Test that all possible types of overlap are found.

        * Starts before - ends during.
        * Starts before - ends the same day.
        * Starts before - ends after.
        * starts and ends on the same day.
        * Starts during - ends before.
        * starts during - ends after.
        """
        listing = ListingFactory()

        assignment = factory.build(
            dict, FACTORY_CLASS=AssignmentFactory, listing=listing
        )

        clash = AssignmentFactory(
            start_date=assignment.get("start_date") + dt.timedelta(days=start_delta),
            end_date=assignment.get("end_date") + dt.timedelta(days=end_delta),
            listing=listing,
        )

        serialiser = AssignmentSerializer()

        overlaps = serialiser.get_overlaps(assignment)

        assert overlaps.get() == clash

    def test_validation_error_raised_on_overlap(self):
        """
        An overlap causes a `ValidationError` to be raised.
        """
        listing = ListingFactory()

        assignment = factory.build(
            dict, FACTORY_CLASS=AssignmentFactory, listing=listing
        )

        AssignmentFactory(
            start_date=assignment.get("start_date"),
            end_date=assignment.get("end_date"),
            listing=listing,
        )

        serializer = AssignmentSerializer()

        with pytest.raises(serializers.ValidationError):
            serializer.validate(assignment)

    def test_invalid_start_date_raises_validation_error(self):
        """
        An Assignment with a date not after 'today' is invalid.
        """
        serializer = AssignmentSerializer()

        with pytest.raises(serializers.ValidationError):
            serializer.validate_start_date(dt.date.today())

    def test_valid_data(self):
        """
        Correct data is deemed valid by the serializer.
        """

        listing = ListingFactory()

        assignment = factory.build(
            dict, FACTORY_CLASS=AssignmentFactory, listing=listing
        )
        assignment["listing"] = listing.id

        serializer = AssignmentSerializer(data=assignment)

        assert serializer.is_valid()
