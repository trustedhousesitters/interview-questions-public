import datetime as dt
import random

import factory
from listings.models import Assignment, Listing


class ListingFactory(factory.django.DjangoModelFactory):
    """
    Factory for `Listing` instances.
    """

    class Meta:
        model = Listing

    first_name = factory.Faker("first_name")
    last_name = factory.Faker("last_name")


class AssignmentFactory(factory.django.DjangoModelFactory):
    """
    Factory for `Assignment` instances.
    """

    class Meta:
        model = Assignment

    start_date = factory.Faker("date_this_year", before_today=False, after_today=True)
    listing = factory.SubFactory(ListingFactory)

    @factory.lazy_attribute
    def end_date(self):
        """
        Create a random end date.

        At least one day after the start date and limited to 30 days.
        """
        return self.start_date + dt.timedelta(days=random.randint(1, 30))
