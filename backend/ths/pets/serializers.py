from .models import Pet
from rest_framework import serializers

class PetSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Pet
        fields = ["name", "animal_type", "description"]