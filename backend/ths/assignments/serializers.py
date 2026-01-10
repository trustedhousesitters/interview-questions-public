from rest_framework import serializers

from .models import Assignment


class AssignmentCreateInputSerializer(serializers.Serializer):
    listing = serializers.IntegerField()
    start_date = serializers.DateField()
    end_date = serializers.DateField()


class AssignmentOutputSerializer(serializers.ModelSerializer):
    class Meta:
        model = Assignment
        fields = ["id", "listing", "start_date", "end_date"]
