from datetime import date

import pytest
from django.urls import reverse
from rest_framework import status

from listings.models import Assignment, Listing
from listings.tests.factories import ListingFactory, AssignmentFactory


@pytest.mark.django_db
class TestListingList:
    """
    Test for ListingList API View.
    """

    listing_1: Listing
    listing_2: Listing
    assignment_1: Assignment
    assignment_2: Assignment

    def setup_method(self):
        """
        Setup boilerplate before each test case.
        """
        self.assignment_1 = AssignmentFactory(
            start_date=date(2023, 2, 7),
            end_date=date(2023, 2, 15),
            listing__first_name="Ross",
            listing__last_name="Geller"
        )
        self.assignment_2 = AssignmentFactory(
            start_date=date(2023, 4, 1),
            end_date=date(2023, 4, 4),
            listing__first_name="Phoebe",
            listing__last_name="Buffay"
        )

        self.listing_1 = self.assignment_1.listing
        self.listing_2 = self.assignment_2.listing

    def test_get_200(self, admin_client):
        """
        A response code of 200 is given for a valid GET call to the endpoint.
        """
        response = admin_client.get(reverse("get_all_listings"))
        assert response.status_code == status.HTTP_200_OK

    def test_get_data(self, admin_client):
        """
        Returned data is as expected when calling the `listings` endpoint.
        """
        expected_response = [
            {
                "first_name": self.listing_1.first_name,
                "last_name": self.listing_1.last_name,
                "pets": [],
                "assignments": [self.assignment_1.pk],
            },
            {
                "first_name": self.listing_2.first_name,
                "last_name": self.listing_2.last_name,
                "pets": [],
                "assignments": [self.assignment_2.pk],
            },
        ]

        response = admin_client.get(reverse("get_all_listings"))
        result = response.data["results"]
        assert [dict(listing) for listing in result] == expected_response

    def test_cache(self, admin_client):
        """
        A freshly created `Listing` will not be present in the response.

        This implies that the cache has been configured properly.
        """
        # Firstly call the endpoint so that the cache is created.
        initial_response = admin_client.get(reverse("get_all_listings"))

        # Create a `Listing` instance and save it in the database.
        ListingFactory()

        actual_number_of_listings = Listing.objects.count()

        # Call the endpoint again.
        second_response = admin_client.get(reverse("get_all_listings"))

        returned_number_of_listings = second_response.data["count"]

        assert second_response.data == initial_response.data
        assert returned_number_of_listings == actual_number_of_listings - 1
