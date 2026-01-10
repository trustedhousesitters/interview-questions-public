from django.db import models


class Assignment(models.Model):
    start_date = models.DateField()
    end_date = models.DateField()
    listing = models.ForeignKey(
        "listings.Listing",
        on_delete=models.CASCADE,
        help_text="The listing that this assignment relates to",
        related_name="assignments",
    )

    class Meta:
        db_table = "listings_assignment"
