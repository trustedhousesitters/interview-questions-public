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

You can now access the API using curl, e.g.

```
curl http://localhost:8000/listings/
```

or go to <http://localhost:8000/listings/> in your browser

Run test suite
==============

```
source venv/bin/activate
cd ths
./manage.py test
````

# Scaling trouble suggestion

============

## Optimise queries by using orm techniques such as select_related or prefetch_related

## Proper indexing of database tables can speed up query processing

## Utilise pagination to help reduce the amount of data transferred and processed

## Caching can significantly reduce database queries, decrease page load times

## Aim to modify endpoint to only return specific or a range of listings

## Load balancing to help distribute incoming requests efficiently
