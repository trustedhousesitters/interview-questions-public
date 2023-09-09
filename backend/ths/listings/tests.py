from datetime import date

from rest_framework import status
from rest_framework.test import APITestCase
from .models import Listing, Assignment


class ListingList(APITestCase):
    def setUp(self):
        self.listing_1 = Listing.objects.create(first_name="Ross", last_name="Geller")
        self.listing_2 = Listing.objects.create(first_name="Phoebe", last_name="Buffay")
        self.assignment_1 = Assignment.objects.create(
            start_date=date(2023, 10, 7),
            end_date=date(2023, 10, 15),
            listing=self.listing_1,
        )
        self.assignment_2 = Assignment.objects.create(
            start_date=date(2023, 10, 1),
            end_date=date(2023, 10, 4),
            listing=self.listing_2,
        )
        self.maxDiff = None

    def test_get_200(self):
        response = self.client.get("/listings/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_data(self):
        response = self.client.get("/listings/")
        response_data = dict(response.data)["results"]  # Isolating pagination data from actual results
        result = [dict(item) for item in response_data]
        expected_data = [
            {
                "first_name": self.listing_2.first_name,
                "last_name": self.listing_2.last_name,
                "pets": [],
                "assignments": [self.assignment_2.pk],
                "created_at": self.listing_2.created_at.strftime('%Y-%m-%dT%H:%M:%S.%fZ')
            },
            {
                "first_name": self.listing_1.first_name,
                "last_name": self.listing_1.last_name,
                "pets": [],
                "assignments": [self.assignment_1.pk],
                "created_at": self.listing_1.created_at.strftime('%Y-%m-%dT%H:%M:%S.%fZ')
            },
        ]
        self.assertEqual(result, expected_data)

    def test_create_assignment_with_valid_data(self):
        data = {
            "start_date": "2023-09-19",
            "end_date": "2023-09-21",
            "listing": self.listing_1.pk
        }
        response = self.client.post(f"/listings/assignments/{self.listing_1.pk}/", data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Assignment.objects.count(), 3)

    def test_create_assignment_with_invalid_data(self):
        data = {
            "start_date": "2022-09-19",
            "end_date": "2024-09-21",
            "listing": self.listing_2.pk
        }
        response = self.client.post(f"/listings/assignments/{self.listing_2.pk}/", data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("Assignment start_date must commence either tomorrow or at a subsequent time.",
                      str(response.data))

    def test_create_assignment_with_overlapping_data(self):
        self.assignment_3 = Assignment.objects.create(
            start_date=date(2023, 11, 1),
            end_date=date(2023, 11, 4),
            listing=self.listing_2,
        )
        data = {
            "start_date": "2023-11-01",
            "end_date": "2023-11-02",
            "listing": self.listing_2.pk
        }
        response = self.client.post(f"/listings/assignments/{self.listing_2.pk}/", data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("Assignment overlaps with an existing assignment on this listing",
                      str(response.data))

    def test_create_assignments_for_invalid_listing_id(self):
        data = {
            "start_date": "2022-09-19",
            "end_date": "2024-09-21",
            "listing": 1002
        }
        response = self.client.post(f"/listings/assignments/{1002}/", data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("object does not exist.", str(response.data))

    def test_create_assignment_with_end_date_less_than_start_date(self):
        data = {
            "start_date": "2024-09-19",
            "end_date": "2024-09-10",
            "listing": self.listing_2.pk
        }
        response = self.client.post(f"/listings/assignments/{1002}/", data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("End Date cannot be greater than Start date", str(response.data))
