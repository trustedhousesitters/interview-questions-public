Installation
============

This project uses Django 3.2, so requires Python >=3.6 and <3.11.

You can create a virtual environment as follows:

```
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

Set up DB
=========

The following commands create the required database tables in a
local sqlite db, and load in some sample data.

```
source venv/bin/activate
cd ths
# run migrations
./manage.py migrate
# Load sample data
./manage.py loaddata sampledata.json
````

Run project
===========

```
source venv/bin/activate
cd ths
./manage.py runserver
````

This runs the Django devserver on port 8000.

API Endpoints
-------------

**Listings** (paginated, 20 per page):
```
# Get all listings (first page)
curl http://localhost:8000/listings/

# Get a specific page
curl http://localhost:8000/listings/?page=2

# Get a single listing by ID
curl http://localhost:8000/listings/1/
```

**Assignments** (create):
```
curl -X POST http://localhost:8000/assignments/ \
  -H "Content-Type: application/json" \
  -d '{"listing": 1, "start_date": "2026-02-01", "end_date": "2026-02-10"}'
```

Or visit these URLs in your browser to use the DRF browsable API.


Run test suite
==============

```
source venv/bin/activate
cd ths
./manage.py test
````

Generate dummy data
===================

For performance testing, you can generate bulk dummy data using the script
in `tools/`:

```
source venv/bin/activate
cd ths
python tools/generate_dummy_data.py --listings 1000
```

Options:
- `--listings N` - Number of listings to create (default: 1000)
- `--pets-per-listing N` - Max pets per listing (default: 3)
- `--assignments-per-listing N` - Max assignments per listing (default: 2)