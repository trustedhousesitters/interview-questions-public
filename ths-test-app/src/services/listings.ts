import type { Listing } from '@/types/listing';
import { get } from '@/services/api';

export const listingsApi = {
  getAll: () => get<Listing[]>('/listings'),
  getById: (id: string) => get<Listing>(`/listings/${id}`),
};
