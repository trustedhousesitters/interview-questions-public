Assignments:
- Made listing read-only in assignments serializer
- Moved tests into a folder to better structure multiple test cases


Optimised Listings endpoint
- Added pagination to results
- Prefetched related models to minimise additional queries

Suggestions
- Add indexing to listings if filters are added
- Add caching of querysets or endpoint results
- Add read replica database (if there is increased database load)
- Add connection pooling (if there are too many connections to the database)