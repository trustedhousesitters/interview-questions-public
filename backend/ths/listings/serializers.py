from rest_framework import serializers

from .models import Listing, Assignment
from django.utils import timezone


class AssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Assignment
        fields = '__all__'

    def validate(self, data):
        start_date = data['start_date']
        end_date = data['end_date']

        if start_date <= (timezone.now().date()):
            raise serializers.ValidationError("Assignments must start the future")

        if start_date > end_date:
            raise serializers.ValidationError("End Date cannot be greater than Start date")

        return data


class ListingSerializer(serializers.ModelSerializer):
    assignments = AssignmentSerializer(many=True, read_only=True)

    class Meta:
        model = Listing
        fields = ['id', 'first_name', 'last_name', 'assignments', 'pets']