from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import AssignmentCreateInputSerializer, AssignmentOutputSerializer
from .services import create_assignment


class AssignmentCreateApi(APIView):
    def post(self, request):
        serializer = AssignmentCreateInputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        assignment = create_assignment(
            listing_id=serializer.validated_data["listing"],
            start_date=serializer.validated_data["start_date"],
            end_date=serializer.validated_data["end_date"],
        )

        output_serializer = AssignmentOutputSerializer(assignment)
        return Response(output_serializer.data, status=status.HTTP_201_CREATED)
