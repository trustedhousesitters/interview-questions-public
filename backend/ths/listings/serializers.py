from datetime import datetime
from rest_framework import serializers
from pets.serializers import PetSerializer
from .models import Assignment
from .models import Listing

class AssignmentSerializer(serializers.ModelSerializer):
    """Assignment Serializer"""
    class Meta:
        model = Assignment
        fields = ["start_date", "end_date"]

class ListingSerializer(serializers.ModelSerializer):
    """Listing Serializer"""
    assignments = AssignmentSerializer(many=True, read_only=True)
    pets = PetSerializer(many=True, read_only=True)

    class Meta:
        model = Listing
        fields = ["first_name", "last_name", "assignments","pets"]


class CreatingAssignmentSerializer(serializers.ModelSerializer):
    """Serializer for creating new assignment"""
    class Meta:
        model = Assignment
        fields = ["start_date","end_date","listing"]
  
    def validate(self,attrs):
        existing_assignments = Assignment.objects.filter(
            listing = attrs["listing"],
            start_date__lt = attrs["end_date"],
            end_date__gt = attrs["start_date"]
        )
        if existing_assignments.exists():
            raise serializers.ValidationError("The provided date range overlaps with an existing assignment.")
        return attrs

    def validate_start_date(self, date):
        if date <= datetime.now().date():
            raise serializers.ValidationError("The date must be at least the day after today.")
        return date
        
    def validate_end_date(self, date):
        if date <= datetime.now().date():
            raise serializers.ValidationError("The date must be at least the day after today.")
        return date
