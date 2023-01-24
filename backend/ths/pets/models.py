from django.db import models


ANIMAL_TYPE_CHOICES = (
    ("Cat", "cat"),
    ("Dog", "dog"),
    ("Fish", "fish"),
    ("Rabbit", "rabbit"),
)


class Pet(models.Model):
    name = models.CharField(max_length=50)
    animal_type = models.CharField(max_length=10, choices=ANIMAL_TYPE_CHOICES)
    description = models.TextField()
    listing = models.ForeignKey(
        "listings.Listing", on_delete=models.CASCADE, related_name="pets"
    )
