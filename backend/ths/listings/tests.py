from datetime import date, timedelta

from django.utils import timezone
from rest_framework import status
from rest_framework.test import APITestCase
from .models import Listing, Assignment


class ListingList(APITestCase):
    def setUp(self):
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

    def test_get_200(self):
        response = self.client.get("/listings/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_data(self):
        response = self.client.get("/listings/")
        self.assertEqual(
            response.data,
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


class AssignmentCreateTestCase(APITestCase):
    
    def create_listing(self):
        return Listing.objects.create(first_name="Ross", last_name="Geller")

    def create_assignment(self, listing, start_offset, end_offset):
        start_date = timezone.now().date() + timedelta(days=start_offset)
        end_date = timezone.now().date() + timedelta(days=end_offset)
        return Assignment.objects.create(
            start_date=start_date,
            end_date=end_date,
            listing=listing,
        )

    def test_create_valid_assignment(self):
        listing = self.create_listing()
        self.create_assignment(listing, 2, 5)

        data = {
            "start_date": (timezone.now().date() + timedelta(days=6)).isoformat(),
            "end_date": (timezone.now().date() + timedelta(days=9)).isoformat(),
            "listing": listing.pk,
        }
        response = self.client.post("/listings/assignments", data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_assignment_starts_too_soon(self):
        listing = self.create_listing()
        self.create_assignment(listing, 2, 5)

        data = {
            "start_date": (timezone.now().date() + timedelta(days=1)).isoformat(),
            "end_date": (timezone.now().date() + timedelta(days=4)).isoformat(),
            "listing": listing.pk,
        }
        response = self.client.post("/listings/assignments", data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_assignment_overlaps_existing(self):
        listing = self.create_listing()
        self.create_assignment(listing, 2, 5)

        data = {
            "start_date": (timezone.now().date() + timedelta(days=3)).isoformat(),
            "end_date": (timezone.now().date() + timedelta(days=4)).isoformat(),
            "listing": listing.pk,
        }
        response = self.client.post("/listings/assignments", data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_assignment_with_end_date_before_start_date(self):
        listing = self.create_listing()
        data = {
            "start_date": (timezone.now().date() + timedelta(days=6)).isoformat(),
            "end_date": (timezone.now().date() + timedelta(days=5)).isoformat(),
            "listing": listing.pk,
        }
        response = self.client.post("/listings/assignments", data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_assignment_with_nonexistent_listing(self):
        NON_EXISTANT_ID = 99999
        data = {
            "start_date": (timezone.now().date() + timedelta(days=6)).isoformat(),
            "end_date": (timezone.now().date() + timedelta(days=9)).isoformat(),
            "listing": NON_EXISTANT_ID,
        }
        response = self.client.post("/listings/assignments", data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_assignment_invalid_date_format(self):
        listing = self.create_listing()
        data = {
            "start_date": "invalid-date-format",
            "end_date": (timezone.now().date() + timedelta(days=5)).isoformat(),
            "listing": listing.pk,
        }
        response = self.client.post("/listings/assignments", data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_assignment_missing_required_fields(self):
        response = self.client.post("/listings/assignments", {})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_assignment_same_start_end_date(self):
        listing = self.create_listing()
        same_day = timezone.now().date() + timedelta(days=6)
        data = {
            "start_date": same_day.isoformat(),
            "end_date": same_day.isoformat(),
            "listing": listing.pk,
        }
        response = self.client.post("/listings/assignments", data)
        # Gonna assume this is correct business logic
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_very_long_assignment(self):
        listing = self.create_listing()
        data = {
            "start_date": (timezone.now().date() + timedelta(days=1)).isoformat(),
            "end_date": (timezone.now().date() + timedelta(days=365)).isoformat(),
            "listing": listing.pk,
        }
        response = self.client.post("/listings/assignments", data)
        # Assuming corrct business logic here too
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_assignment_with_past_dates(self):
        listing = self.create_listing()
        data = {
            "start_date": (timezone.now().date() - timedelta(days=5)).isoformat(),
            "end_date": (timezone.now().date() - timedelta(days=3)).isoformat(),
            "listing": listing.pk,
        }
        response = self.client.post("/listings/assignments", data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


