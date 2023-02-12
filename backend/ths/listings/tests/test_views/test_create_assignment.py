import factory
import pytest
from django.urls import reverse
from rest_framework import status

from listings.models import Assignment
from listings.tests.factories import ListingFactory, AssignmentFactory


@pytest.mark.django_db
class TestCreateAssignment:
    """
    All tests for the `CreateAssignment` view.
    """

    def test_post_201(self, admin_client):
        """
        Successful post results in a response with status 201.
        """
        listing = ListingFactory()

        assignment = factory.build(
            dict, FACTORY_CLASS=AssignmentFactory, listing=listing.id
        )

        response = admin_client.post(reverse("create_assignment"), data=assignment)

        assert response.status_code == status.HTTP_201_CREATED
        assert Assignment.objects.get(**assignment)

    def test_post_bad_data(self, admin_client):
        """
        Posting invalid data results in a response with status 400.
        """
        assignment = factory.build(
            dict,
            FACTORY_CLASS=AssignmentFactory,
        )

        assignment["start_date"] = "Umbrella"

        response = admin_client.post(reverse("create_assignment"), data=assignment)

        assert response.status_code == status.HTTP_400_BAD_REQUEST

    def test_existing_assignment_gets_400(self, admin_client):
        """
        Trying to post existing assignment results in a status 400 response.
        """
        existing = AssignmentFactory()

        data = {
            "start_date": existing.start_date,
            "end_date": existing.end_date,
            "listing": existing.listing.id,
        }

        response = admin_client.post(reverse("create_assignment"), data=data)

        assert response.status_code == status.HTTP_400_BAD_REQUEST
