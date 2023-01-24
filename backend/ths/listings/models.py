from django.db import models


class Listing(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)


class Assignment(models.Model):
    start_date = models.DateField()
    end_date = models.DateField()
    listing = models.ForeignKey(
        Listing,
        on_delete=models.CASCADE,
        help_text="The listing that this assignment relates to",
        related_name="assignments",
    )
