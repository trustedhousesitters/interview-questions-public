from datetime import date

import pytest
from rest_framework import status

from backend.ths.listings.models import Assignment, Listing


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
        self.listing_1 = Listing.objects.create(first_name="Ross", last_name="Geller")
        self.listing_2 = Listing.objects.create(first_name="Phoebe", last_name="Buffay")
        self.assignment_1 = Assignment.objects.create(
            start_date=date(2023, 2, 7),
            end_date=date(2023, 2, 15),
            listing=self.listing_1,
        )
        self.assignment_2 = Assignment.objects.create(
            start_date=date(2023, 4, 1),
            end_date=date(2023, 4, 4),
            listing=self.listing_2,
        )

    def test_get_200(self, client):
        """
        A response code of 200 is given for a valid call to the endpoint.
        """
        response = client.get("/listings/")
        assert response.status_code == status.HTTP_200_OK

    def test_get_data(self, client):
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

        response = client.get("/listings/")
        assert response.data == expected_response
