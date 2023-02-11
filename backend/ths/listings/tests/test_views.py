from datetime import date

import pytest
from rest_framework import status

from listings.models import Assignment, Listing


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

    def test_get_200(self, admin_client):
        """
        A response code of 200 is given for a valid GET call to the endpoint.
        """
        response = admin_client.get("/listings/")
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

        response = admin_client.get("/listings/")
        assert response.data == expected_response

    # def test_post_201(self, admin_client):
    #     """
    #     A valid POST request returns a status 201.
    #     """
    #     # Build a `Listing` instance from the factory without saving it
    #     # and convert the factory's output to a dictionary.
    #     payload = factory.build(dict, FACTORY_CLASS=ListingFactory)
    #
    #     response = admin_client.post(reverse("listing"), data=payload)
    #
    #     assert response.status_code == 201
    #
    # def test_post_creates_listing(self, admin_client):
    #     """
    #     A valid POST request returns a status 201.
    #     """
    #     # Build a `Listing` instance from the factory without saving it
    #     # and convert the factory's output to a dictionary.
    #
    #     payload = factory.build(dict, FACTORY_CLASS=ListingFactory)
    #
    #     # Get the initial count.
    #     initial_count = Listing.objects.count()
    #     # Post the data to the endpoint.
    #     admin_client.post(reverse("listing"), data=payload)
    #     # Assert that the number of `Listing` objects has incremented by 1.
    #     assert Listing.objects.count() == initial_count + 1


