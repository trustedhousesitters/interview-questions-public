from rest_framework.pagination import CursorPagination


class ListingPagination(CursorPagination):
    page_size = 20
    ordering = '-created_at'  # Fetch Listings in Descending Order based on creation date [Recent Listings First]
