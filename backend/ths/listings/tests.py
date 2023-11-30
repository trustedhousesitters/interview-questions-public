from datetime import date,timedelta

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
        assert response.json()["results"] == [
            {'first_name': self.listing_1.first_name, 'last_name': self.listing_1.last_name, 
            'assignments': [{'start_date': '2023-02-07', 'end_date': '2023-02-15'}], 'pets': []}, 
            {'first_name': self.listing_2.first_name, 'last_name': self.listing_2.last_name, 
            'assignments': [{'start_date': '2023-04-01', 'end_date': '2023-04-04'}], 'pets': []}]


class CreateAssignment(APITestCase):
    def setUp(self):

        self.today = date.today()
        self.current_day=str(self.today)
        self.next_day = str(self.today + timedelta(days=1))
        self.three_days_later= str(self.today + timedelta(days=3))
        self.five_days_later= str(self.today + timedelta(days=5))

        self.listing_1 = Listing.objects.create(first_name="Ross", last_name="Geller")
        self.listing_2 = Listing.objects.create(first_name="Phoebe", last_name="Buffay")
        self.listing_3 = Listing.objects.create(first_name="Johb", last_name="Bo")

        self.assignment_1 = Assignment.objects.create(
            start_date=date(2023, 2, 7),
            end_date=date(2023, 2, 15),
            listing=self.listing_1,
        )
        
        self.assignment_2 = Assignment.objects.create(start_date=self.next_day,end_date=self.five_days_later,listing=self.listing_3)

    def test_post_assignment_201(self):
       
        response = self.client.post(
            "/listings/create-assignment/",
            data={
                "start_date": self.next_day,
                "end_date": self.next_day,
                "listing": self.listing_1.id,
            }
        )
       
        assert response.status_code == status.HTTP_201_CREATED

    def test_post_assignment_on_current_date(self):
        """Test to ensure assignment for the same day is not accepted"""
        response = self.client.post(
            "/listings/create-assignment/",
            data={
                "start_date": self.current_day,
                "end_date": self.current_day,
                "listing": self.listing_1.id,
            },
        )
        assert response.status_code == status.HTTP_400_BAD_REQUEST

    def test_post_assignment_no_overlap(self):
        """Test to ensure overlap on existing assignment is not allowed"""
        response = self.client.post(
            "/listings/create-assignment/",
            data={
                "start_date": self.next_day,
                "end_date": self.three_days_later,
                "listing": self.listing_3.id,
            },
        )
        assert response.status_code == status.HTTP_400_BAD_REQUEST
