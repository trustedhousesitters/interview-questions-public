export type ListingAnimal = {
  name: string;
  slug: string;
  count: number;
};

export type ListingLocation = {
  name: string;
  admin1Name: string;
  countryName: string;
};

export type ListingUser = {
  id: string;
  firstName: string;
};

export type Listing = {
  id: string;
  title: string;
  published: string;
  location: ListingLocation;
  user: ListingUser;
  animals: ListingAnimal[];
};
