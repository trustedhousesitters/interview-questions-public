from datetime import date, timedelta

from rest_framework import status
from rest_framework.test import APITestCase
from .models import Listing
from assignments.models import Assignment


class ListingList(APITestCase):
    def setUp(self):
        self.listing_1 = Listing.objects.create(first_name="Ross", last_name="Geller")
        self.listing_2 = Listing.objects.create(first_name="Phoebe", last_name="Buffay")
        tomorrow = date.today() + timedelta(days=1)

        self.assignment_1 = Assignment.objects.create(
            start_date=tomorrow,
            end_date=tomorrow + timedelta(days=8),
            listing=self.listing_1,
        )
        self.assignment_2 = Assignment.objects.create(
            start_date=tomorrow + timedelta(days=30),
            end_date=tomorrow + timedelta(days=33),
            listing=self.listing_2,
        )

    def test_get_200(self):
        response = self.client.get("/listings/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_data(self):
        response = self.client.get("/listings/")
        self.assertEqual(
            response.data['results'],
            [
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
            ],
        )


class ListingDetail(APITestCase):
    def setUp(self):
        self.listing = Listing.objects.create(first_name="Ross", last_name="Geller")
        tomorrow = date.today() + timedelta(days=1)
        self.assignment = Assignment.objects.create(
            start_date=tomorrow,
            end_date=tomorrow + timedelta(days=8),
            listing=self.listing,
        )

    def test_get_200(self):
        response = self.client.get(f"/listings/{self.listing.pk}/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_data(self):
        response = self.client.get(f"/listings/{self.listing.pk}/")
        self.assertEqual(
            response.data,
            {
                "first_name": self.listing.first_name,
                "last_name": self.listing.last_name,
                "pets": [],
                "assignments": [self.assignment.pk],
            },
        )

    def test_get_not_found(self):
        response = self.client.get("/listings/99999/")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
