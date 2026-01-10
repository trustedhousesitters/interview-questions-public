from django.urls import path

from .views import AssignmentCreateApi

urlpatterns = [
    path("", AssignmentCreateApi.as_view(), name="assignment-create"),
]
