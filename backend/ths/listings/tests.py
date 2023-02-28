from datetime import date
from unittest.mock import patch

from parameterized import parameterized
from rest_framework import status
from rest_framework.test import APITestCase

from .models import Assignment, Listing


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


class AssignmentCreate(APITestCase):
    ENDPOINT = "/listings/assignments/"

    def setUp(self):
        self.listing = Listing.objects.create(first_name="Ross", last_name="Geller")

    def test_get_405(self):
        # GET should not be allowed on the endpoint
        response = self.client.get(self.ENDPOINT)
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

    @patch("listings.views.date", fromisoformat=date.fromisoformat)
    def test_create(self, date_mock):
        date_mock.today.return_value = date(2023, 2, 5)
        # Future assignment creation happy path
        data = {
            "start_date": date(2023, 2, 10),
            "end_date": date(2023, 2, 17),
            "listing": self.listing.pk,
        }
        response = self.client.post(self.ENDPOINT, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # Check response data
        response_data = response.json()
        self.assertEqual(str(data["start_date"]), response_data["start_date"])
        self.assertEqual(str(data["end_date"]), response_data["end_date"])
        self.assertEqual(data["listing"], response_data["listing"])

    @patch("listings.views.date", fromisoformat=date.fromisoformat)
    def test_bad_listing_id(self, date_mock):
        date_mock.today.return_value = date(2023, 2, 5)

        data = {
            "start_date": date(2023, 2, 10),
            "end_date": date(2023, 2, 17),
            "listing": "foo",  # NB invalid pk
        }
        response = self.client.post(self.ENDPOINT, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    @patch("listings.views.date", fromisoformat=date.fromisoformat)
    def test_missing_listing_id(self, date_mock):
        date_mock.today.return_value = date(2023, 2, 5)

        data = {
            "start_date": date(2023, 2, 10),
            "end_date": date(2023, 2, 17),
            # NB missing pk
        }
        response = self.client.post(self.ENDPOINT, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    @parameterized.expand(
        [
            [
                date(2023, 2, 3),
                date(2023, 2, 11),
                status.HTTP_400_BAD_REQUEST,
            ],
            [
                date(2023, 2, 5),
                date(2023, 2, 11),
                status.HTTP_400_BAD_REQUEST,
            ],
            [
                date(2023, 2, 6),
                date(2023, 2, 11),
                status.HTTP_201_CREATED,
            ],
            [
                date(2023, 12, 25),
                date(2023, 12, 31),
                status.HTTP_201_CREATED,
            ],
        ]
    )
    @patch("listings.views.date", fromisoformat=date.fromisoformat)
    def test_start_tomorrow_or_later_required(
        self, start_date, end_date, expected, date_mock
    ):
        date_mock.today.return_value = date(2023, 2, 5)

        data = {
            "start_date": start_date,
            "end_date": end_date,
            "listing": self.listing.pk,
        }
        response = self.client.post(self.ENDPOINT, data)
        self.assertEqual(response.status_code, expected)

    @parameterized.expand(
        [
            [
                date(2023, 3, 28),
                date(2023, 4, 12),
            ],  # overlaps start of proposed dates
            [
                date(2023, 4, 25),
                date(2023, 5, 11),
            ],  # overlaps end of proposed dates
            [
                date(2023, 3, 20),
                date(2023, 4, 29),
            ],  # encomposses whole proposed dates
            [
                date(2023, 4, 10),
                date(2023, 4, 12),
            ],  # completely within proposed dates
        ]
    )
    @patch("listings.views.date", fromisoformat=date.fromisoformat)
    def test_no_overlap_this_listing(self, existing_start, existing_end, date_mock):
        date_mock.today.return_value = date(2023, 2, 5)

        # create existing assignment according to parameterised data
        self.listing.assignments.create(
            start_date=existing_start, end_date=existing_end
        )

        data = {
            "start_date": date(2023, 3, 30),
            "end_date": date(2023, 4, 27),
            "listing": self.listing.pk,
        }
        response = self.client.post(self.ENDPOINT, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    @parameterized.expand(
        [
            [
                date(2023, 3, 28),
                date(2023, 4, 12),
            ],  # overlaps start
            [
                date(2023, 4, 25),
                date(2023, 5, 11),
            ],  # overlaps end
            [
                date(2023, 3, 20),
                date(2023, 4, 29),
            ],  # encomposses whole
            [
                date(2023, 4, 10),
                date(2023, 4, 12),
            ],  # within proposed range
        ]
    )
    @patch("listings.views.date", fromisoformat=date.fromisoformat)
    def test_assignment_no_overlap_ignore_other_listings(
        self, existing_start, existing_end, date_mock
    ):
        # Assignments on other listings should not affect ours
        date_mock.today.return_value = date(2023, 2, 5)

        # Create assignment on other listing according to parameterised data
        other_listing = Listing.objects.create(first_name="Grumpy", last_name="Cat")
        other_listing.assignments.create(
            start_date=existing_start, end_date=existing_end
        )

        # Assignment date checks should be for this listing only
        data = {
            "start_date": date(2023, 3, 30),
            "end_date": date(2023, 4, 27),
            "listing": self.listing.pk,
        }
        response = self.client.post(self.ENDPOINT, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
