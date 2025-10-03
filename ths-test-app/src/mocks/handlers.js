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
        "title": "Hehehehdskejbssbsjshsj",
        "photos": [
            {
                "id": "2794285",
                "publicId": "remote_media/media/photo/75/6cdc4ef68a48f1a889e7691b1a582d.jpg"
            },
            {
                "id": "2794283",
                "publicId": "remote_media/media/photo/8e/65245cb2844cf48642ce97591e5a14.jpeg"
            },
            {
                "id": "2794280",
                "publicId": "remote_media/media/photo/f0/a2085fcfc54f29ac21b603cf80bb13.jpeg"
            },
            {
                "id": "2794281",
                "publicId": "remote_media/media/photo/17/2f5e1b1aee4ed4bca16b95dec3984c.jpeg"
            },
            {
                "id": "2794282",
                "publicId": "remote_media/media/photo/2c/f6a25b05f6430baf2c636fbcaec3b9.jpeg"
            },
            {
                "id": "2794284",
                "publicId": "remote_media/media/photo/03/46203a68864f4b9f3e9d276ee030fd.jpeg",
                "description": "Test"
            },
            {
                "id": "2804761",
                "publicId": "remote_media/media/photo/34/581304bab34419bb34e66f3c3e04aa.jpeg"
            },
            {
                "id": "2804762",
                "publicId": "remote_media/media/photo/b0/25dd5ac1224c52a76e6100f499658b.jpeg"
            },
            {
                "id": "2804763",
                "publicId": "remote_media/media/photo/f3/b9c75c7dad4676b233f80142cc939a.jpeg"
            },
            {
                "id": "2804764",
                "publicId": "remote_media/media/photo/60/65bd81730d49c4a8ded031d75e1f0d.jpeg"
            },
            {
                "id": "2804766",
                "publicId": "remote_media/media/photo/15/a07e101c5844e88afa832484daaf6d.jpeg"
            },
            {
                "id": "2804768",
                "publicId": "remote_media/media/photo/c6/b5483b8b914a25a1b834d88664791b.jpeg"
            }
        ],
        "assignments": [
            {
                "id": "473369",
                "startDate": "2025-10-09",
                "endDate": "2025-10-11",
                "numberOfApplicants": 0,
                "isReviewing": false,
                "isConfirmed": false
            }
        ],
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
        "photos": [
            {
                "id": "2240443",
                "publicId": "remote_media/media/photo/79/4c1ea3f67e447793a2426d808b875f.jpeg"
            },
            {
                "id": "2240442",
                "publicId": "remote_media/media/photo/3e/e26efa5c7b49f396e46fa61a3f73c4.jpeg"
            },
            {
                "id": "2240444",
                "publicId": "remote_media/media/photo/96/2436ff5bb444e1a291fc03c1bfa6e6.jpeg"
            },
            {
                "id": "2240445",
                "publicId": "remote_media/media/photo/08/2609dad5f544a0b4b6b252f2c8c597.jpeg"
            },
            {
                "id": "2240446",
                "publicId": "remote_media/media/photo/6c/bb04186373430aa67b253e6d49e2b4.jpeg"
            }
        ],
        "assignments": [
            {
                "id": "472876",
                "startDate": "2025-10-09",
                "endDate": "2025-10-16",
                "numberOfApplicants": 0,
                "isReviewing": false,
                "isConfirmed": true
            },
            {
                "id": "472877",
                "startDate": "2025-12-13",
                "endDate": "2025-12-20",
                "numberOfApplicants": 0,
                "isReviewing": false,
                "isConfirmed": false
            }
        ],
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
        "photos": [
            {
                "id": "2242243",
                "publicId": "remote_media/media/photo/65/b83345c0b441a683df22f044ecbdf7.jpg"
            },
            {
                "id": "2236945",
                "publicId": "remote_media/media/photo/a3/d5ed3f9ac34c629f75ac4c2c85aeb2.jpg"
            },
            {
                "id": "2240631",
                "publicId": "remote_media/media/photo/75/3732d4ffa54acf8f586fbbf2e42e36.jpg"
            },
            {
                "id": "2261757",
                "publicId": "remote_media/media/photo/33/e0f1e52b09422a89e43be4b1097943.jpg"
            }
        ],
        "assignments": [
            {
                "id": "472782",
                "startDate": "2025-11-10",
                "endDate": "2025-11-16",
                "numberOfApplicants": 0,
                "isReviewing": false,
                "isConfirmed": false
            },
            {
                "id": "472781",
                "startDate": "2026-01-04",
                "endDate": "2026-01-11",
                "numberOfApplicants": 0,
                "isReviewing": false,
                "isConfirmed": false
            },
            {
                "id": "472874",
                "startDate": "2026-02-20",
                "endDate": "2026-02-23",
                "numberOfApplicants": 0,
                "isReviewing": false,
                "isConfirmed": false
            }
        ],
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
        "photos": [
            {
                "id": "2240858",
                "publicId": "remote_media/media/photo/26/058f10048240dba8a9901fe453220b.jpg"
            },
            {
                "id": "2236696",
                "publicId": "remote_media/media/photo/c2/974e6b774d4d1287ce1514c52a9bdf.jpg"
            },
            {
                "id": "2250812",
                "publicId": "remote_media/media/photo/23/adb19b59114407a026d24e2b3346fe.png"
            },
            {
                "id": "2250813",
                "publicId": "remote_media/media/photo/d3/c6e1909fc447eba5a06a3deeffeef0.png"
            }
        ],
        "assignments": [
            {
                "id": "472872",
                "startDate": "2025-11-08",
                "endDate": "2025-11-15",
                "numberOfApplicants": 0,
                "isReviewing": false,
                "isConfirmed": false
            }
        ],
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
        "photos": [
            {
                "id": "2820513",
                "publicId": "remote_media/media/photo/c6/9ea4819476467f9fa70c8899e37bf5.jpeg"
            },
            {
                "id": "3020518",
                "publicId": "remote_media/media/photo/f9/6b09bddb154f6cbd0ed86155abe1a5.jpeg"
            },
            {
                "id": "3020519",
                "publicId": "remote_media/media/photo/e0/14c0c1bf704a378550b60a5ae76af2.jpeg"
            },
            {
                "id": "2712930",
                "publicId": "remote_media/media/photo/5b/a393128618414aa6deeb3dd4887ff2.png"
            },
            {
                "id": "2712931",
                "publicId": "remote_media/media/photo/6c/52e3fe3e694b628a7d371bf555783f.png"
            },
            {
                "id": "2712934",
                "publicId": "remote_media/media/photo/46/6182661b954c2dbb6ad5fee5f1c7e6.png"
            },
            {
                "id": "2712935",
                "publicId": "remote_media/media/photo/88/a6bc9b041748a4987019fa860ab909.png"
            },
            {
                "id": "2712936",
                "publicId": "remote_media/media/photo/fa/174c261d9241cdacbaa88fe1077c4b.png"
            },
            {
                "id": "2712937",
                "publicId": "remote_media/media/photo/d7/f9d8beecb14c30ac35b3352bf54aab.png"
            }
        ],
        "assignments": [
            {
                "id": "472511",
                "startDate": "2025-10-14",
                "endDate": "2025-10-19",
                "numberOfApplicants": 0,
                "isReviewing": false,
                "isConfirmed": false
            },
            {
                "id": "472510",
                "startDate": "2025-10-21",
                "endDate": "2025-10-26",
                "numberOfApplicants": 0,
                "isReviewing": false,
                "isConfirmed": true
            }
        ],
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
        "photos": [
            {
                "id": "2734660",
                "publicId": "remote_media/media/photo/6e/3f81f0b3c74a079930a6643aee1dbc.png"
            },
            {
                "id": "2734661",
                "publicId": "remote_media/media/photo/9f/388d00bfa54a61ba049c53201e9d12.png"
            },
            {
                "id": "2734666",
                "publicId": "remote_media/media/photo/3d/f7ef61364f4eea9f701e0e064c00c4.png"
            },
            {
                "id": "2734667",
                "publicId": "remote_media/media/photo/78/62b4aab6aa4954a36d9a3df260646d.png"
            },
            {
                "id": "2734668",
                "publicId": "remote_media/media/photo/e8/4e9873d36e4a3caff8add026f64bf7.png"
            },
            {
                "id": "2734662",
                "publicId": "remote_media/media/photo/86/aa958cd80a4a48b14c05a704851fbc.png"
            },
            {
                "id": "2734663",
                "publicId": "remote_media/media/photo/74/43294477b24d9e93f62de683989f3b.png"
            },
            {
                "id": "2742210",
                "publicId": "remote_media/media/photo/88/73b72198d04add9e28eb5ecbbec233.png"
            },
            {
                "id": "2742211",
                "publicId": "remote_media/media/photo/94/6c2e281e22408c949f2b8a02f8b678.png"
            },
            {
                "id": "2742212",
                "publicId": "remote_media/media/photo/4e/d9108ea0a64cf593b20414b5da6dbe.png"
            },
            {
                "id": "2742213",
                "publicId": "remote_media/media/photo/8c/aef2b5586a49ab8a4ad6711c18a52b.png"
            },
            {
                "id": "2742214",
                "publicId": "remote_media/media/photo/d2/22aa2204ad4a59a4f1c087ed0388d3.png"
            },
            {
                "id": "2734664",
                "publicId": "remote_media/media/photo/8c/fea884ba7448879369a7c3b854c6e0.png"
            },
            {
                "id": "2734670",
                "publicId": "remote_media/media/photo/17/18358aba264145a711dcebec973834.png"
            },
            {
                "id": "2742215",
                "publicId": "remote_media/media/photo/b1/9a4561392b4cfcaf8e318d02c61856.png"
            },
            {
                "id": "2742216",
                "publicId": "remote_media/media/photo/42/5e279fa586457da001b2614759506d.png"
            },
            {
                "id": "2742217",
                "publicId": "remote_media/media/photo/06/dfca6d2ce04106ab6bc1bd95ea91a3.png"
            },
            {
                "id": "2742218",
                "publicId": "remote_media/media/photo/6e/88e029511a494fa3040a5890854f10.png"
            },
            {
                "id": "2742219",
                "publicId": "remote_media/media/photo/83/9ea5c3b18742ecbefedbb60fb75f99.png"
            },
            {
                "id": "2742220",
                "publicId": "remote_media/media/photo/31/68ff422ce9402b90a7d4dec5bff036.png"
            },
            {
                "id": "2742221",
                "publicId": "remote_media/media/photo/f1/6cdff440c5450ea77936fb433e3c8a.png"
            },
            {
                "id": "2742222",
                "publicId": "remote_media/media/photo/23/15fc5ffbfa46fb958c1c93d0579d17.png"
            },
            {
                "id": "2742223",
                "publicId": "remote_media/media/photo/05/e98b6313e64c9a89196fd6f10e0cf1.png"
            },
            {
                "id": "2742224",
                "publicId": "remote_media/media/photo/cb/3309b679f744ec87877f569fa487c9.png"
            },
            {
                "id": "2742225",
                "publicId": "remote_media/media/photo/a2/5c006a3a5c4fd3a37d1947ac88747a.png"
            },
            {
                "id": "2742235",
                "publicId": "remote_media/media/photo/e7/236ba8317043b98314eb19392e3f02.png"
            },
            {
                "id": "2742236",
                "publicId": "remote_media/media/photo/3d/2849d0719446d9b8f91166fdc7478f.png"
            },
            {
                "id": "2742268",
                "publicId": "remote_media/media/photo/d7/11ab237a864567a72bd5da099e0ca6.png"
            },
            {
                "id": "2742269",
                "publicId": "remote_media/media/photo/9e/4df6ed5ad54e3fbd83732e708fa97d.png"
            },
            {
                "id": "2742267",
                "publicId": "remote_media/media/photo/8d/4ae6314e1e421aa048d87bd897c6e9.png"
            }
        ],
        "assignments": [
            {
                "id": "469777",
                "startDate": "2025-10-09",
                "endDate": "2025-10-12",
                "numberOfApplicants": 1,
                "isReviewing": true,
                "isConfirmed": true
            },
            {
                "id": "471537",
                "startDate": "2025-10-15",
                "endDate": "2025-10-16",
                "numberOfApplicants": 1,
                "isReviewing": false,
                "isConfirmed": true
            },
            {
                "id": "472425",
                "startDate": "2025-10-22",
                "endDate": "2025-10-23",
                "numberOfApplicants": 0,
                "isReviewing": false,
                "isConfirmed": false
            },
            {
                "id": "472424",
                "startDate": "2025-10-24",
                "endDate": "2025-10-26",
                "numberOfApplicants": 5,
                "isReviewing": true,
                "isConfirmed": false
            }
        ],
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
        "title": "olive tseting",
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
        "assignments": [
            {
                "id": "472162",
                "startDate": "2026-03-14",
                "endDate": "2026-03-29",
                "numberOfApplicants": 0,
                "isReviewing": false,
                "isConfirmed": false
            },
            {
                "id": "472163",
                "startDate": "2026-05-15",
                "endDate": "2026-05-30",
                "numberOfApplicants": 0,
                "isReviewing": false,
                "isConfirmed": false
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
        "title": "My listing title2",
        "photos": [
            {
                "id": "2381075",
                "publicId": "remote_media/media/photo/d9/dbcd80e8f44840bab23b7abf05869a.jpg",
                "description": "kitchen"
            },
            {
                "id": "2381076",
                "publicId": "remote_media/media/photo/84/d6da0ab1754c6f92f0183232055235.png"
            },
            {
                "id": "2381077",
                "publicId": "remote_media/media/photo/4b/b02a8e12324eeb866af85a860a12c4.png"
            },
            {
                "id": "2381078",
                "publicId": "remote_media/media/photo/c1/efa5155c3d4bfe9566b8299488058e.jpeg"
            },
            {
                "id": "2381079",
                "publicId": "remote_media/media/photo/67/faf891f088479eb2b071dd2d9a2c2a.jpeg"
            },
            {
                "id": "2883975",
                "publicId": "remote_media/media/photo/5f/fcc01ad0e24b5da80192357cdc8678.png",
                "description": "happy tchutchu"
            },
            {
                "id": "2883976",
                "publicId": "remote_media/media/photo/6e/c47941532845cd9670527d6db77089.png",
                "description": "Sad tchutchu"
            }
        ],
        "assignments": [
            {
                "id": "471538",
                "startDate": "2025-10-13",
                "endDate": "2025-10-14",
                "numberOfApplicants": 1,
                "isReviewing": false,
                "isConfirmed": false
            },
            {
                "id": "472150",
                "startDate": "2025-10-25",
                "endDate": "2025-10-30",
                "numberOfApplicants": 1,
                "isReviewing": false,
                "isConfirmed": true
            }
        ],
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
        "title": "this is a test",
        "photos": [
            {
                "id": "2215230",
                "publicId": "remote_media/media/photo/f3/3dc08815ec44d29ab76100a9ca2a02.jpg"
            }
        ],
        "assignments": [
            {
                "id": "471641",
                "startDate": "2025-11-13",
                "endDate": "2025-11-15",
                "numberOfApplicants": 0,
                "isReviewing": false,
                "isConfirmed": false
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
        "photos": [
            {
                "id": "3051059",
                "publicId": "remote_media/media/photo/96/c57c02da0044fd9933fa7af5ba8877.jpg"
            },
            {
                "id": "3051056",
                "publicId": "remote_media/media/photo/e1/1d5ea9be1d4d60bf1cbdf607032a63.jpg"
            },
            {
                "id": "3051060",
                "publicId": "remote_media/media/photo/b3/3776389e204d65b8cd1147e9c466b2.jpg"
            },
            {
                "id": "3051057",
                "publicId": "remote_media/media/photo/57/3346fe7bf140cbbad628ef0b4a3ef4.jpg"
            },
            {
                "id": "3051061",
                "publicId": "remote_media/media/photo/64/8c8647ddcd47979561101e3901fc85.jpg"
            },
            {
                "id": "3051062",
                "publicId": "remote_media/media/photo/d0/6f2609332d40949bd325c3b923124b.jpg"
            },
            {
                "id": "3051063",
                "publicId": "remote_media/media/photo/f8/4a87900abe477f93dfe95955218366.jpg"
            }
        ],
        "assignments": [
            {
                "id": "471640",
                "startDate": "2026-01-09",
                "endDate": "2026-01-23",
                "numberOfApplicants": 1,
                "isReviewing": false,
                "isConfirmed": false
            },
            {
                "id": "471639",
                "startDate": "2026-03-21",
                "endDate": "2026-03-28",
                "numberOfApplicants": 1,
                "isReviewing": false,
                "isConfirmed": true
            }
        ],
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
        "photos": [
            {
                "id": "2228835",
                "publicId": "remote_media/media/photo/f4/3d078c91254b2c9a22e370261f9e53.jpg"
            },
            {
                "id": "2228838",
                "publicId": "remote_media/media/photo/76/adde0026b848ceaa991c0ad30fa364.jpg"
            },
            {
                "id": "2241815",
                "publicId": "remote_media/media/photo/b9/c74e60c9e84610b29f43f0dd37814d.png"
            },
            {
                "id": "2241817",
                "publicId": "remote_media/media/photo/7a/74c8a5812548e2bd7d894ad156e355.jpg"
            },
            {
                "id": "2241818",
                "publicId": "remote_media/media/photo/6c/2bb3a9a1614ea6b2264b6d8c3fe0ed.jpg"
            },
            {
                "id": "2243654",
                "publicId": "remote_media/media/photo/ef/ec4b56263f49f8bb2ba0ace1f6a29c.jpeg"
            },
            {
                "id": "2247997",
                "publicId": "remote_media/media/photo/a0/6e32e2d34d47b2b116971bb7c73217.jpg"
            },
            {
                "id": "2248832",
                "publicId": "remote_media/media/photo/1c/0362d7ae7842ae86d98918c4540690.jpg"
            },
            {
                "id": "2240587",
                "publicId": "remote_media/media/photo/dd/a00fec446e4c8bad5b13c18999a9f4.jpg"
            },
            {
                "id": "2249011",
                "publicId": "remote_media/media/photo/14/b8d3e509584f8eadfe6dbf6f883b22.jpg"
            },
            {
                "id": "2240588",
                "publicId": "remote_media/media/photo/5f/6b30ddfd0c49f99aad8c7644b62ed7.jpeg"
            },
            {
                "id": "2249012",
                "publicId": "remote_media/media/photo/7b/d14ea1fd1048088ae2c59e688bfd0f.jpg"
            },
            {
                "id": "2479260",
                "publicId": "remote_media/media/photo/6f/137fbee8c540088613a4c7f7f78f0b.png"
            },
            {
                "id": "2479261",
                "publicId": "remote_media/media/photo/00/5637cc51b04a4d8b7b59ece2c0ce7e.png"
            },
            {
                "id": "2249135",
                "publicId": "remote_media/media/photo/01/74c8c3554341bd925608caaea26e35.png"
            },
            {
                "id": "2249136",
                "publicId": "remote_media/media/photo/68/11fa77eeae4c6ebef7c897d5eadd59.png"
            }
        ],
        "assignments": [
            {
                "id": "471572",
                "startDate": "2025-12-01",
                "endDate": "2025-12-07",
                "numberOfApplicants": 0,
                "isReviewing": false,
                "isConfirmed": false
            }
        ],
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
        "photos": [
            {
                "id": "2133248",
                "publicId": "remote_media/media/photo/c4/4ac31aac704575ac494696725415f4.png",
                "tagGroup": "home"
            },
            {
                "id": "2242501",
                "publicId": "remote_media/media/photo/22/aba253ae444791a512e1592361720e.jpeg"
            },
            {
                "id": "2242502",
                "publicId": "remote_media/media/photo/4a/1d0a68102242f0b95c79cb47cc361e.png"
            },
            {
                "id": "2242503",
                "publicId": "remote_media/media/photo/1f/9b626ecbc44519a8844ae729ac9fa0.jpeg"
            },
            {
                "id": "2631664",
                "publicId": "remote_media/media/photo/30/739dc53b0d4d0e83c023eda0795434.webp"
            },
            {
                "id": "2631665",
                "publicId": "remote_media/media/photo/20/480ad5b0364d99b221e75cbb4a9a1f.jpeg"
            }
        ],
        "assignments": [
            {
                "id": "471071",
                "startDate": "2025-10-30",
                "endDate": "2025-11-08",
                "numberOfApplicants": 1,
                "isReviewing": false,
                "isConfirmed": false
            },
            {
                "id": "464676",
                "startDate": "2025-12-03",
                "endDate": "2025-12-07",
                "numberOfApplicants": 1,
                "isReviewing": false,
                "isConfirmed": false
            },
            {
                "id": "464675",
                "startDate": "2025-12-12",
                "endDate": "2025-12-16",
                "numberOfApplicants": 0,
                "isReviewing": false,
                "isConfirmed": false
            },
            {
                "id": "390800",
                "startDate": "2026-01-01",
                "endDate": "2026-01-02",
                "numberOfApplicants": 1,
                "isReviewing": false,
                "isConfirmed": false
            },
            {
                "id": "450247",
                "startDate": "2026-09-10",
                "endDate": "2026-09-18",
                "numberOfApplicants": 1,
                "isReviewing": false,
                "isConfirmed": true
            },
            {
                "id": "403169",
                "startDate": "2026-09-10",
                "endDate": "2026-09-16",
                "numberOfApplicants": 1,
                "isReviewing": false,
                "isConfirmed": true
            },
            {
                "id": "402825",
                "startDate": "2026-12-28",
                "endDate": "2027-01-07",
                "numberOfApplicants": 1,
                "isReviewing": false,
                "isConfirmed": false
            },
            {
                "id": "402632",
                "startDate": "2027-04-07",
                "endDate": "2027-04-11",
                "numberOfApplicants": 3,
                "isReviewing": false,
                "isConfirmed": false
            },
            {
                "id": "436020",
                "startDate": "2028-08-12",
                "endDate": "2028-08-16",
                "numberOfApplicants": 1,
                "isReviewing": false,
                "isConfirmed": false
            },
            {
                "id": "433481",
                "startDate": "2028-10-01",
                "endDate": "2028-10-31",
                "numberOfApplicants": 1,
                "isReviewing": false,
                "isConfirmed": false
            },
            {
                "id": "471369",
                "startDate": "2029-07-01",
                "endDate": "2029-07-07",
                "numberOfApplicants": 0,
                "isReviewing": false,
                "isConfirmed": false
            }
        ],
        "published": "2025-09-17T20:50:33"
    }
];

const handlers = [
  http.get("/api/listings", () => {
    return HttpResponse.json(results);
  }),
  http.get("/api/listings/:id", (req) => {
    const { id } = req.params;
    const pet = results.find((p) => p.id === id);
    if (pet) {
      return HttpResponse.json(pet);
    } else {
      return HttpResponse.json({ error: "Listing not found" }, { status: 404 });
    }
  }),
];

export default handlers;