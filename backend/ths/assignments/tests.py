from datetime import date, timedelta

from django.core.exceptions import ValidationError
from django.test import TestCase

from rest_framework import status
from rest_framework.test import APITestCase

from listings.models import Listing

from .models import Assignment
from .services import create_assignment


class CreateAssignmentServiceTests(TestCase):
    def setUp(self):
        self.listing = Listing.objects.create(first_name="Test", last_name="User")
        self.tomorrow = date.today() + timedelta(days=1)
        self.day_after_tomorrow = date.today() + timedelta(days=2)

    def test_create_assignment_success(self):
        assignment = create_assignment(
            listing_id=self.listing.id,
            start_date=self.tomorrow,
            end_date=self.day_after_tomorrow,
        )

        self.assertEqual(assignment.listing_id, self.listing.id)
        self.assertEqual(assignment.start_date, self.tomorrow)
        self.assertEqual(assignment.end_date, self.day_after_tomorrow)

    def test_create_assignment_start_date_today_fails(self):
        with self.assertRaises(ValidationError) as context:
            create_assignment(
                listing_id=self.listing.id,
                start_date=date.today(),
                end_date=self.tomorrow,
            )

        self.assertIn("tomorrow or later", str(context.exception))

    def test_create_assignment_start_date_in_past_fails(self):
        yesterday = date.today() - timedelta(days=1)

        with self.assertRaises(ValidationError) as context:
            create_assignment(
                listing_id=self.listing.id,
                start_date=yesterday,
                end_date=date.today(),
            )

        self.assertIn("tomorrow or later", str(context.exception))

    def test_create_assignment_start_date_after_end_date_fails(self):
        with self.assertRaises(ValidationError) as context:
            create_assignment(
                listing_id=self.listing.id,
                start_date=self.tomorrow + timedelta(days=5),
                end_date=self.tomorrow,
            )

        self.assertIn("Start date must be before end date", str(context.exception))

    def test_create_assignment_start_date_equals_end_date_fails(self):
        with self.assertRaises(ValidationError) as context:
            create_assignment(
                listing_id=self.listing.id,
                start_date=self.tomorrow,
                end_date=self.tomorrow,
            )

        self.assertIn("Start date must be before end date", str(context.exception))

    def test_create_assignment_overlapping_fails(self):
        Assignment.objects.create(
            listing=self.listing,
            start_date=self.tomorrow,
            end_date=self.tomorrow + timedelta(days=5),
        )

        with self.assertRaises(ValidationError) as context:
            create_assignment(
                listing_id=self.listing.id,
                start_date=self.tomorrow + timedelta(days=2),
                end_date=self.tomorrow + timedelta(days=7),
            )

        self.assertIn("overlaps", str(context.exception))

    def test_create_assignment_adjacent_succeeds(self):
        Assignment.objects.create(
            listing=self.listing,
            start_date=self.tomorrow,
            end_date=self.tomorrow + timedelta(days=5),
        )

        assignment = create_assignment(
            listing_id=self.listing.id,
            start_date=self.tomorrow + timedelta(days=5),
            end_date=self.tomorrow + timedelta(days=10),
        )

        self.assertEqual(assignment.start_date, self.tomorrow + timedelta(days=5))

    def test_create_assignment_different_listing_succeeds(self):
        other_listing = Listing.objects.create(first_name="Other", last_name="Person")

        Assignment.objects.create(
            listing=self.listing,
            start_date=self.tomorrow,
            end_date=self.tomorrow + timedelta(days=5),
        )

        assignment = create_assignment(
            listing_id=other_listing.id,
            start_date=self.tomorrow,
            end_date=self.tomorrow + timedelta(days=5),
        )

        self.assertEqual(assignment.listing_id, other_listing.id)


class AssignmentCreateApiTests(APITestCase):
    def setUp(self):
        self.listing = Listing.objects.create(first_name="Test", last_name="User")
        self.tomorrow = date.today() + timedelta(days=1)
        self.day_after_tomorrow = date.today() + timedelta(days=2)

    def test_create_assignment_api_success(self):
        response = self.client.post(
            "/assignments/",
            {
                "listing": self.listing.id,
                "start_date": self.tomorrow.isoformat(),
                "end_date": self.day_after_tomorrow.isoformat(),
            },
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["listing"], self.listing.id)
        self.assertEqual(response.data["start_date"], self.tomorrow.isoformat())
        self.assertEqual(response.data["end_date"], self.day_after_tomorrow.isoformat())

    def test_create_assignment_api_start_date_today_fails(self):
        response = self.client.post(
            "/assignments/",
            {
                "listing": self.listing.id,
                "start_date": date.today().isoformat(),
                "end_date": self.tomorrow.isoformat(),
            },
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("error", response.data)

    def test_create_assignment_api_overlapping_fails(self):
        Assignment.objects.create(
            listing=self.listing,
            start_date=self.tomorrow,
            end_date=self.tomorrow + timedelta(days=5),
        )

        response = self.client.post(
            "/assignments/",
            {
                "listing": self.listing.id,
                "start_date": (self.tomorrow + timedelta(days=2)).isoformat(),
                "end_date": (self.tomorrow + timedelta(days=7)).isoformat(),
            },
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("error", response.data)

    def test_create_assignment_api_missing_fields(self):
        response = self.client.post(
            "/assignments/",
            {
                "listing": self.listing.id,
            },
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
