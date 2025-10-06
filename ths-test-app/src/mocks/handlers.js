import { http, HttpResponse } from "msw";

const results = [
      {
        "id": "385669",
        "location": {
            "name": "Boston",
            "slug": "boston",
            "admin1Name": "Massachusetts",
            "admin1Slug": "massachusetts",
            "admin2Name": "Suffolk County",
            "admin2Slug": "suffolk-county",
            "countryName": "United States",
            "countrySlug": "united-states",
            "continentName": "NA",
            "continentSlug": "north-america",
            "coordinates": {
                "lat": 42.35843,
                "lon": -71.05977
            }
        },
        "user": {
            "id": "1406127",
            "firstName": "standard combined",
            "profilePhoto": {
                "id": "3014699",
                "publicId": "remote_media/media/photo/70/84aa35605e493985d515e7c4ec52c0.jpeg"
            },
            "isReferred": false,
            "referredCount": 0
        },
        "animals": [
            {
                "name": "dog",
                "slug": "dogs",
                "count": 3
            }
        ],
        "title": "Mountain sit with two cats",
        "published": "2025-09-30T13:16:03"
    },
    {
        "id": "338555",
        "location": {
            "name": "Maidstone",
            "slug": "maidstone",
            "admin1Name": "England",
            "admin1Slug": "england",
            "admin2Name": "Kent",
            "admin2Slug": "kent",
            "countryName": "United Kingdom",
            "countrySlug": "united-kingdom",
            "continentName": "EU",
            "continentSlug": "europe",
            "coordinates": {
                "lat": 51.26667,
                "lon": 0.51667
            }
        },
        "user": {
            "id": "1306628",
            "firstName": "Louise Premiumowner",
            "profilePhoto": {
                "id": "2240441",
                "publicId": "remote_media/media/photo/88/7691a0386147c4877f9000efab2804.jpeg"
            },
            "isReferred": false,
            "referredCount": 0
        },
        "animals": [],
        "title": "Beach stay with dog",
        "published": "2025-09-29T09:01:53"
    },
    {
        "id": "339162",
        "location": {
            "name": "Bournemouth",
            "slug": "bournemouth",
            "admin1Name": "England",
            "admin1Slug": "england",
            "admin2Name": "Bournemouth",
            "admin2Slug": "bournemouth",
            "countryName": "United Kingdom",
            "countrySlug": "united-kingdom",
            "continentName": "EU",
            "continentSlug": "europe",
            "coordinates": {
                "lat": 50.72048,
                "lon": -1.8795
            }
        },
        "user": {
            "id": "1311000",
            "firstName": "ldaubney+o5",
            "profilePhoto": {
                "id": "2519257",
                "publicId": "remote_media/media/photo/6d/38624884c049d08b3f604cb39b6380.png"
            },
            "isReferred": false,
            "referredCount": 0
        },
        "animals": [
            {
                "name": "dog",
                "slug": "dogs",
                "count": 1
            }
        ],
        "title": "Come and stay by the beach with my dog",
        "published": "2025-09-29T08:45:28"
    },
    {
        "id": "338551",
        "location": {
            "name": "Horsham",
            "slug": "horsham",
            "admin1Name": "England",
            "admin1Slug": "england",
            "admin2Name": "West Sussex",
            "admin2Slug": "west-sussex",
            "countryName": "United Kingdom",
            "countrySlug": "united-kingdom",
            "continentName": "EU",
            "continentSlug": "europe",
            "coordinates": {
                "lat": 51.06314,
                "lon": -0.32757
            }
        },
        "user": {
            "id": "1306623",
            "firstName": "Louise Standardowner",
            "profilePhoto": {
                "id": "2240224",
                "publicId": "remote_media/media/photo/5b/111c4d5d464fb5aafa8d1a27c73089.jpg"
            },
            "isReferred": false,
            "referredCount": 0
        },
        "animals": [
            {
                "name": "cat",
                "slug": "cats",
                "count": 1
            }
        ],
        "title": "Rural Horsham stay with Labrador",
        "published": "2025-09-29T08:25:47"
    },
    {
        "id": "428883",
        "location": {
            "name": "Uruguaiana",
            "slug": "uruguaiana",
            "admin1Name": "Rio Grande do Sul",
            "admin1Slug": "rio-grande-do-sul",
            "admin2Name": "Uruguaiana",
            "admin2Slug": "uruguaiana",
            "countryName": "Brazil",
            "countrySlug": "brazil",
            "continentName": "SA",
            "continentSlug": "south-america",
            "coordinates": {
                "lat": -29.75472,
                "lon": -57.08833
            }
        },
        "user": {
            "id": "1480534",
            "firstName": "Igor",
            "profilePhoto": {
                "id": "2712924",
                "publicId": "remote_media/media/photo/71/6f0a9be51a4e18bb19431bf5d6339e.jpg"
            },
            "isReferred": false,
            "referredCount": 0
        },
        "animals": [
            {
                "name": "dog",
                "slug": "dogs",
                "count": 1
            },
            {
                "name": "cat",
                "slug": "cats",
                "count": 2
            },
            {
                "name": "reptile",
                "slug": "reptiles",
                "count": 1
            }
        ],
        "title": "Igor's Listing Test for Dashboard",
        "published": "2025-09-26T05:31:35"
    },
    {
        "id": "412561",
        "location": {
            "name": "Peterborough",
            "slug": "peterborough",
            "admin1Name": "England",
            "admin1Slug": "england",
            "admin2Name": "Peterborough",
            "admin2Slug": "peterborough",
            "countryName": "United Kingdom",
            "countrySlug": "united-kingdom",
            "continentName": "EU",
            "continentSlug": "europe",
            "coordinates": {
                "lat": 52.57364,
                "lon": -0.24777
            }
        },
        "user": {
            "id": "1451164",
            "firstName": "Ariane",
            "profilePhoto": {
                "id": "2988337",
                "publicId": "remote_media/media/photo/9d/411b00d292447188f0b20ef678e5a5.png"
            },
            "isReferred": false,
            "referredCount": 0
        },
        "animals": [
            {
                "name": "dog",
                "slug": "dogs",
                "count": 2
            },
            {
                "name": "cat",
                "slug": "cats",
                "count": 2
            },
            {
                "name": "reptile",
                "slug": "reptiles",
                "count": 2
            },
            {
                "name": "horse",
                "slug": "horses",
                "count": 1
            },
            {
                "name": "fish",
                "slug": "fish",
                "count": 1
            }
        ],
        "title": "Pet sitter required for two lovely friendly dogs that like to stay at home",
        "published": "2025-09-25T15:04:44"
    },
    {
        "id": "475665",
        "location": {
            "name": "Swindon",
            "slug": "swindon",
            "admin1Name": "England",
            "admin1Slug": "england",
            "admin2Name": "Borough of Swindon",
            "admin2Slug": "borough-of-swindon",
            "countryName": "United Kingdom",
            "countrySlug": "united-kingdom",
            "continentName": "EU",
            "continentSlug": "europe",
            "coordinates": {
                "lat": 51.55797,
                "lon": -1.78116
            }
        },
        "user": {
            "id": "1568051",
            "firstName": "Unhappy",
            "profilePhoto": {
                "id": "3053787",
                "publicId": "remote_media/media/photo/13/3cdb4f49dd4931ac2c25f57b5e5a25.png"
            },
            "isReferred": false,
            "referredCount": 0
        },
        "animals": [
            {
                "name": "poultry",
                "slug": "poultry",
                "count": 1
            }
        ],
        "title": "Horse ranch needs looking after",
        "photos": [
            {
                "id": "3053789",
                "publicId": "remote_media/media/photo/d0/6d6fdafc6d4ff68c3686a880a33cba.png"
            },
            {
                "id": "3053788",
                "publicId": "remote_media/media/photo/3e/bba80532bf47c9a3cb24692fb8dc5e.png"
            },
            {
                "id": "3053790",
                "publicId": "remote_media/media/photo/1e/e9c213b9aa4419aeb96b030b02f934.png"
            },
            {
                "id": "3053791",
                "publicId": "remote_media/media/photo/31/e49fb5d39f496b80fed8ecd1db8c12.jpg"
            },
            {
                "id": "3053792",
                "publicId": "remote_media/media/photo/5a/48b2a408e24f678cbd56e74de20475.jpg"
            }
        ],
        "published": "2025-09-23T10:37:36"
    },
    {
        "id": "386308",
        "location": {
            "name": "Brighton",
            "slug": "brighton",
            "admin1Name": "England",
            "admin1Slug": "england",
            "admin2Name": "Brighton and Hove",
            "admin2Slug": "brighton-and-hove",
            "countryName": "United Kingdom",
            "countrySlug": "united-kingdom",
            "continentName": "EU",
            "continentSlug": "europe",
            "coordinates": {
                "lat": 50.82838,
                "lon": -0.13947
            }
        },
        "user": {
            "id": "1407305",
            "firstName": "Ariane",
            "profilePhoto": {
                "id": "2380033",
                "publicId": "remote_media/media/photo/8b/84ebde9a1c4f718e4458ec3443b626.jpg"
            },
            "isReferred": false,
            "referredCount": 0
        },
        "animals": [
            {
                "name": "dog",
                "slug": "dogs",
                "count": 1
            }
        ],
        "title": "Remote sit in beautiful Brighton home",
        "published": "2025-09-22T19:42:26"
    },
    {
        "id": "332323",
        "location": {
            "name": "Christchurch",
            "slug": "christchurch",
            "admin1Name": "England",
            "admin1Slug": "england",
            "admin2Name": "Dorset",
            "admin2Slug": "dorset",
            "countryName": "United Kingdom",
            "countrySlug": "united-kingdom",
            "continentName": "EU",
            "continentSlug": "europe",
            "coordinates": {
                "lat": 50.73583,
                "lon": -1.78129
            }
        },
        "user": {
            "id": "1252773",
            "firstName": "Louise+owner2",
            "profilePhoto": {
                "id": "2935712",
                "publicId": "remote_media/media/photo/a1/67a532afd149b992b1ae6e2ca6f1a9.jpg"
            },
            "isReferred": false,
            "referredCount": 0
        },
        "animals": [
            {
                "name": "poultry",
                "slug": "poultry",
                "count": 1
            }
        ],
        "title": "Farm stay with chickens",
        "photos": [
            {
                "id": "2215230",
                "publicId": "remote_media/media/photo/f3/3dc08815ec44d29ab76100a9ca2a02.jpg"
            }
        ],
        "published": "2025-09-19T12:15:13"
    },
    {
        "id": "475198",
        "location": {
            "name": "Brighton",
            "slug": "brighton",
            "admin1Name": "England",
            "admin1Slug": "england",
            "admin2Name": "Brighton and Hove",
            "admin2Slug": "brighton-and-hove",
            "countryName": "United Kingdom",
            "countrySlug": "united-kingdom",
            "continentName": "EU",
            "continentSlug": "europe",
            "coordinates": {
                "lat": 50.82838,
                "lon": -0.13947
            }
        },
        "user": {
            "id": "1567188",
            "firstName": "expo3",
            "profilePhoto": {
                "id": "3051055",
                "publicId": "remote_media/media/photo/05/fe9ad18dac4060a9c9a1062ca74ad1.jpg"
            },
            "isReferred": false,
            "referredCount": 0
        },
        "animals": [
            {
                "name": "dog",
                "slug": "dogs",
                "count": 1
            }
        ],
        "title": "Luna Loops wants to be your buddy",
        "published": "2025-09-19T12:15:00"
    },
    {
        "id": "339501",
        "location": {
            "name": "Axminster",
            "slug": "axminster",
            "admin1Name": "England",
            "admin1Slug": "england",
            "admin2Name": "Devon",
            "admin2Slug": "devon",
            "countryName": "United Kingdom",
            "countrySlug": "united-kingdom",
            "continentName": "EU",
            "continentSlug": "europe",
            "coordinates": {
                "lat": 50.78259,
                "lon": -2.99787
            }
        },
        "user": {
            "id": "1313563",
            "firstName": "l.daubney+premcombi1",
            "profilePhoto": {
                "id": "3037521",
                "publicId": "remote_media/media/photo/d4/10f289c899472394797ae181c8caf2.jpg"
            },
            "isReferred": false,
            "referredCount": 0
        },
        "animals": [
            {
                "name": "dog",
                "slug": "dogs",
                "count": 2
            },
            {
                "name": "small pet",
                "slug": "small-pets",
                "count": 1
            },
            {
                "name": "farm animal",
                "slug": "farm-animals",
                "count": 1
            }
        ],
        "title": "Beautiful home in Horsham with cuddly dogs test",
        "published": "2025-09-19T10:17:10"
    },
    {
        "id": "332078",
        "location": {
            "name": "London",
            "slug": "london",
            "admin1Name": "England",
            "admin1Slug": "england",
            "admin2Name": "Greater London",
            "admin2Slug": "greater-london",
            "countryName": "United Kingdom",
            "countrySlug": "united-kingdom",
            "continentName": "EU",
            "continentSlug": "europe",
            "coordinates": {
                "lat": 51.50853,
                "lon": -0.12574
            }
        },
        "user": {
            "id": "1252247",
            "firstName": "Brucebrucebrucebabybruce",
            "profilePhoto": {
                "id": "2133273",
                "publicId": "remote_media/media/photo/59/643c5ac9614669bcdaabed4e936056.png",
                "tagGroup": "profile"
            },
            "isReferred": false,
            "referredCount": 1
        },
        "animals": [
            {
                "name": "cat",
                "slug": "cats",
                "count": 1
            }
        ],
        "title": "Shed Life",
        "published": "2025-09-17T20:50:33"
    }
];

const handlers = [
  http.get("/api/listings", () => {
    return HttpResponse.json(results);
  }),
  http.get("/api/listings/:id", (req) => {
    const { id } = req.params;
    const listing = results.find((p) => p.id === id);
    if (listing) {
      return HttpResponse.json(listing);
    } else {
      return HttpResponse.json({ error: "Listing not found" }, { status: 404 });
    }
  }),
];

export default handlers;