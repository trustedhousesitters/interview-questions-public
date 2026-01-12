import { useState } from "react";

export interface Listing {
  id: string;
  title: string;
}

export function useListings() {
  const [listingData, setListingData] = useState<Listing[]>([]);
  const [listingState, setListingState] = useState<{ listing: any; error: string | null }>({
    listing: null,
    error: null,
  });

  const getAllListings = () => {
    fetch("/api/listings")
      .then(response => response.json())
      .then(data => setListingData(data));
  };

  const getListingById = (id: string) => {
    setListingState({ listing: null, error: null });
    fetch(`/api/listings/${id}`)
      .then(response => {
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('not_found');
          }
          throw new Error('network_error');
        }
        return response.json();
      })
      .then(data => {
        setListingState({ listing: data, error: null });
      })
      .catch(err => {
        setListingState({ listing: null, error: err.message || 'network_error' });
      });
  };

  return {
    listingData,
    listing: listingState.listing,
    error: listingState.error,
    getAllListings,
    getListingById
  };
}
