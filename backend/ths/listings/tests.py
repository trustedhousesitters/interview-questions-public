from datetime import date

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

    def test_get_data(self):
        response = self.client.get("/listings/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 2)
        self.assertEqual(response.data['count'], 3)
        self.assertEqual(response.data['results'][0]['first_name'], 'Emmanuel')
        self.assertEqual(response.data['results'][1]['first_name'], 'Freeman')
