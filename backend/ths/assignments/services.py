from datetime import date, timedelta

from django.core.exceptions import ValidationError

from .models import Assignment


def create_assignment(
    *,
    listing_id: int,
    start_date: date,
    end_date: date,
) -> Assignment:
    tomorrow = date.today() + timedelta(days=1)

    if start_date < tomorrow:
        raise ValidationError("Assignment must start tomorrow or later.")

    overlapping = Assignment.objects.filter(
        listing_id=listing_id,
        start_date__lt=end_date,
        end_date__gt=start_date,
    ).exists()

    if overlapping:
        raise ValidationError(
            "Assignment overlaps with an existing assignment for this listing."
        )

    assignment = Assignment.objects.create(
        listing_id=listing_id,
        start_date=start_date,
        end_date=end_date,
    )

    return assignment
