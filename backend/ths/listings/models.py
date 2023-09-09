from django.db import models
from django.utils import timezone
from rest_framework.exceptions import ValidationError
from django.db.models import Q


class BaseModel(models.Model):
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)

    class Meta:
        abstract = True

    def save(self, *args, **kwargs):
        self.updated_at = timezone.now()
        super().save(*args, **kwargs)


class Listing(BaseModel):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)


class Assignment(BaseModel):
    start_date = models.DateField()
    end_date = models.DateField()
    listing = models.ForeignKey(
        Listing,
        on_delete=models.CASCADE,
        help_text="The listing that this assignment relates to",
        related_name="assignments",
    )

    class Meta:
        indexes = [
            models.Index(fields=['start_date', 'end_date'])
        ]

    def validate_dates(self):
        if self.start_date <= timezone.now().date():
            raise ValidationError("Assignment start_date must commence either tomorrow or at a subsequent time.")

        overlapping_assignment = Assignment.objects.filter(
            Q(start_date__lte=self.start_date, end_date__gte=self.start_date) |
            Q(start_date__lte=self.end_date, end_date__gte=self.end_date),
            listing=self.listing
        ).exists()

        if overlapping_assignment:
            raise ValidationError("Assignment overlaps with an existing assignment on this listing")

        if self.start_date > self.end_date:
            raise ValidationError("End Date cannot be greater than Start date")

    def save(self, *args, **kwargs):
        self.validate_dates()
        super().save(*args, **kwargs)
