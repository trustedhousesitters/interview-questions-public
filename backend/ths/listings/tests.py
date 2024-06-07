import threading
from datetime import date, timedelta

from django.utils import timezone
from rest_framework import status
from rest_framework.test import APITestCase
from .models import Listing, Assignment


class ListingList(APITestCase):
    def setUp(self):
        self.listing_1 = Listing.objects.create(first_name="Emmanuel", last_name="Ogbiyoyo")
        self.listing_2 = Listing.objects.create(first_name="Freeman", last_name="Joseph")
        self.listing_2 = Listing.objects.create(first_name="Omotola", last_name="Arogundade")
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

    def test_listing_has_assignments(self):
        listing = Listing.objects.get(first_name="Emmanuel", last_name="Ogbiyoyo")
        assignments = listing.assignments.all()
        self.assertEqual(assignments.count(), 1)
        self.assertIn(self.assignment_1, assignments)

    def test_get_data(self):
        response = self.client.get("/listings/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 2)
        self.assertEqual(response.data['count'], 3)
        self.assertEqual(response.data['results'][0]['first_name'], 'Omotola')
        self.assertEqual(response.data['results'][1]['first_name'], 'Freeman')
        self.assertEqual(
            response.data['next'],
            "http://testserver/listings/?page=2"
        )


class AssignmentCreateViewTestCase(APITestCase):
    ENDPOINT = "/listings/assignments/"

    def setUp(self):
        self.listing = Listing.objects.create(first_name="Monica", last_name="Geller")

    def test_create_assignment(self):
        data = {
            "start_date": timezone.now().date() + timedelta(days=1),
            "end_date": timezone.now().date() + timedelta(days=3),
            "listing": self.listing.id
        }
        response = self.client.post(self.ENDPOINT, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Assignment.objects.count(), 1)
        self.assertEqual(Assignment.objects.get().listing, self.listing)

    def test_create_assignment_invalid_dates(self):
        data = {
            "start_date": timezone.now().date() + timedelta(days=10),
            "end_date": timezone.now().date() + timedelta(days=1),
            "listing": self.listing.id
        }
        response = self.client.post("/listings/assignments/", data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("Start Date cannot be greater than End date", response.data['non_field_errors'])

    def test_create_assignment_overlap(self):
        Assignment.objects.create(
            start_date=timezone.now().date() + timedelta(days=10),
            end_date=timezone.now().date() + timedelta(days=15),
            listing=self.listing
        )
        data = {
            "start_date": timezone.now().date() + timedelta(days=12),
            "end_date": timezone.now().date() + timedelta(days=17),
            "listing": self.listing.id
        }
        response = self.client.post(self.ENDPOINT, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("This assignment overlaps with an existing assignment.", response.data['detail'])

    def test_create_assignment_missing_listing(self):
        data = {
            "start_date": date(2022, 3, 28),
            "end_date": date(2025, 3, 29),
        }
        response = self.client.post(self.ENDPOINT, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_invalid_date_on_leap_year_listing(self):
        data = {
            "start_date": "2026-02-29",
            "end_date": "2026-03-29",
            "listing": self.listing.id
        }
        response = self.client.post(self.ENDPOINT, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_assignment_past_start_date(self):
        data = {
            "start_date": "2023-01-01",
            "end_date": "2023-01-10",
            "listing": self.listing.id
        }
        response = self.client.post(self.ENDPOINT, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("Assignments must start the future", response.data['non_field_errors'])

    def test_create_assignment_race_condition(self):
        def create_assignment():
            self.client.post('/assignments/', {
                'listing': self.listing.id,
                'start_date': (timezone.now() + timedelta(days=10)).date(),
                'end_date': (timezone.now() + timedelta(days=12)).date(),
            }, format='json')

        thread1 = threading.Thread(target=create_assignment)
        thread2 = threading.Thread(target=create_assignment)

        thread1.start()
        thread2.start()

        thread1.join()
        thread2.join()

        assignments = Assignment.objects.filter(
            listing=self.listing,
            start_date=(timezone.now() + timedelta(days=10)).date(),
            end_date=(timezone.now() + timedelta(days=12)).date(),
        )

        self.assertTrue(assignments.count() <= 1)