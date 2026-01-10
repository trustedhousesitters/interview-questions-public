#!/usr/bin/env python
"""
Generate dummy data for performance testing.

Usage:
    cd backend/ths
    python tools/generate_dummy_data.py --listings 1000
"""
import argparse
import os
import random
import sys
from datetime import date, timedelta

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "ths.settings")

import django
django.setup()

from assignments.models import Assignment
from listings.models import Listing
from pets.models import ANIMAL_TYPE_CHOICES, Pet


FIRST_NAMES = [
    "Alice", "Bob", "Charlie", "Diana", "Edward", "Fiona", "George", "Hannah",
    "Ivan", "Julia", "Kevin", "Laura", "Michael", "Nina", "Oscar", "Paula",
    "Quinn", "Rachel", "Steve", "Tina", "Ulrich", "Victoria", "Walter", "Xena",
    "Yuri", "Zara"
]

LAST_NAMES = [
    "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller",
    "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez",
    "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin"
]

PET_NAMES = [
    "Buddy", "Max", "Charlie", "Cooper", "Rocky", "Bear", "Duke", "Tucker",
    "Luna", "Bella", "Daisy", "Lucy", "Sadie", "Molly", "Bailey", "Maggie",
    "Whiskers", "Shadow", "Simba", "Oscar", "Milo", "Tiger", "Leo", "Jasper"
]


def generate_data(num_listings, max_pets, max_assignments):
    print(f"Creating {num_listings} listings...")

    listings = [
        Listing(
            first_name=random.choice(FIRST_NAMES),
            last_name=random.choice(LAST_NAMES),
        )
        for _ in range(num_listings)
    ]
    Listing.objects.bulk_create(listings)

    created_listings = list(Listing.objects.order_by("-pk")[:num_listings])

    print(f"Creating pets for {len(created_listings)} listings...")

    animal_types = [choice[0] for choice in ANIMAL_TYPE_CHOICES]
    pets = []
    for listing in created_listings:
        num_pets = random.randint(0, max_pets)
        for _ in range(num_pets):
            pets.append(
                Pet(
                    name=random.choice(PET_NAMES),
                    animal_type=random.choice(animal_types),
                    description=f"A lovely {random.choice(animal_types).lower()}",
                    listing=listing,
                )
            )
    Pet.objects.bulk_create(pets)

    print(f"Creating assignments for {len(created_listings)} listings...")

    assignments = []
    base_date = date.today()
    for listing in created_listings:
        num_assignments = random.randint(0, max_assignments)
        for i in range(num_assignments):
            start_offset = random.randint(0, 365) + (i * 30)
            start_date = base_date + timedelta(days=start_offset)
            end_date = start_date + timedelta(days=random.randint(3, 14))
            assignments.append(
                Assignment(
                    start_date=start_date,
                    end_date=end_date,
                    listing=listing,
                )
            )
    Assignment.objects.bulk_create(assignments)

    print(
        f"Successfully created {num_listings} listings, "
        f"{len(pets)} pets, and {len(assignments)} assignments"
    )


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Generate dummy listings, pets, and assignments for performance testing"
    )
    parser.add_argument(
        "--listings",
        type=int,
        default=1000,
        help="Number of listings to create (default: 1000)",
    )
    parser.add_argument(
        "--pets-per-listing",
        type=int,
        default=3,
        help="Max number of pets per listing (default: 3)",
    )
    parser.add_argument(
        "--assignments-per-listing",
        type=int,
        default=2,
        help="Max number of assignments per listing (default: 2)",
    )

    args = parser.parse_args()
    generate_data(args.listings, args.pets_per_listing, args.assignments_per_listing)
