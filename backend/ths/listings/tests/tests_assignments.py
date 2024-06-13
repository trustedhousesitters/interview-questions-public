from datetime import datetime, timedelta

from rest_framework import status
from rest_framework.test import APITestCase

from listings.models import Listing, Assignment


class AssignmentCreateTestCase(APITestCase):
    def setUp(self):
        self.listing = Listing.objects.create(first_name="Joey", last_name="Tribbiani")

        self.current_time = datetime.now()
        self.assignment = Assignment.objects.create(
            start_date=self.current_time + timedelta(days=4),
            end_date=self.current_time + timedelta(days=7),
            listing=self.listing,
        )
        self.assignments_url = f'/listings/{self.listing.pk}/assignments/'

        self.create_data = {
            "start_date": (self.current_time + timedelta(days=10)).date().isoformat(),
            "end_date": (self.current_time + timedelta(days=20)).date().isoformat(),
        }

    def assert_overlap_dates(self, overlap_data: dict[str, str]) -> None:
        """
        Helper method to assert overlaping dates
        Another option would be to use parameterized or pytest.fixture
        """
        overlap_response = self.client.post(self.assignments_url, overlap_data, format='json')
        self.assertEqual(overlap_response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn(
            "Assignment dates overlap with an existing assignment.",
            overlap_response.json()["non_field_errors"]
        )

    def test_post_create_assignment__valid_data__created_201(self):
        response = self.client.post(self.assignments_url, self.create_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED, response.json())

        created_assignment = Assignment.objects.filter(
            listing=self.listing,
            start_date=self.create_data["start_date"],
            end_date=self.create_data["end_date"]
        ).exists()

        self.assertTrue(created_assignment)

    def test_post_create_assignment__invalid_listing__not_found_404(self):
        response = self.client.post("/listings/635463456/assignments/", self.create_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_post_create_assignment__past_date__bad_request_400(self):
        data = {
            "start_date": (self.current_time - timedelta(days=1)).date().isoformat(),
            "end_date": (self.current_time + timedelta(days=1)).date().isoformat(),
        }
        response = self.client.post(self.assignments_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("Assignment date should be in the future.", response.json()["start_date"])

    def test_post_create_assignment__start_date_after_end_date__bad_request_400(self):
        data = {
            "start_date": (self.current_time + timedelta(days=10)).date().isoformat(),
            "end_date": (self.current_time + timedelta(days=1)).date().isoformat(),
        }
        response = self.client.post(self.assignments_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("Start date should be before end date.", response.json()["non_field_errors"])

    def test_overlap_starts_before_ends_within_existing__bad_request_400(self):
        overlap_data = {
            "start_date": (self.current_time + timedelta(days=3)).date().isoformat(),
            "end_date": (self.current_time + timedelta(days=5)).date().isoformat(),
        }
        self.assert_overlap_dates(overlap_data)

    def test_overlap_starts_within_ends_after_existing__bad_request_400(self):
        overlap_data = {
            "start_date": (self.current_time + timedelta(days=5)).date().isoformat(),
            "end_date": (self.current_time + timedelta(days=8)).date().isoformat(),
        }
        self.assert_overlap_dates(overlap_data)

    def test_overlap_starts_ends_within_existing__bad_request_400(self):
        overlap_data = {
            "start_date": (self.current_time + timedelta(days=5)).date().isoformat(),
            "end_date": (self.current_time + timedelta(days=6)).date().isoformat(),
        }
        self.assert_overlap_dates(overlap_data)

    def test_overlap_covers_existing__bad_request_400(self):
        overlap_data = {
            "start_date": (self.current_time + timedelta(days=3)).date().isoformat(),
            "end_date": (self.current_time + timedelta(days=8)).date().isoformat(),
        }
        self.assert_overlap_dates(overlap_data)
