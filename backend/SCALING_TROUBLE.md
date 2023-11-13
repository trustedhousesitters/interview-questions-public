

# Pagination
All listings are being returned in a single response which gets slower over time as the number of listings increases. so a TODO could be toimplement pagination:

https://www.django-rest-framework.org/api-guide/pagination/

# Optimise retrieval
Django is currently fetching ListingSerializer related fields with seperate queries, we should use `select_related` or `prefetch_related` in the query set api.

Here id just go through this api and make the nessessary changes

https://docs.djangoproject.com/en/4.2/ref/models/querysets/


# Optimise field use during seriealization
In ListingSerializer we have this these fields binded to the `fields` var:

`fields = ["first_name", "last_name", "pets", "assignments"]`

Although, depending on the ideal business logic which I'm still not too sure about, I'm assuming it should be possible for a listing to have multiple assignments because multiple people can cover different parts of the listing with different assignments.

So imagine:

1000 listings
each listing has 5 assignments
serialising all listings would requires 5k additional queries to retireve assignments which gets worse with scale.

The most simple soltion id sugges is to make the problematic field optional i.e. just creating another class coming up with more complex optimisations as the need arises to keep code readable

```
class ListingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Listing
        fields = ["first_name", "last_name", "pets"]
```

and...

```
class ListingWithAssignmentsSerializer(serializers.ModelSerializer):
    assignments = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Listing
        fields = ["first_name", "last_name", "pets", "assignments"]
```

