import { DELETE_PET, CREATE_PET } from './types';

export const deletePetById = (id) => ({
  type: DELETE_PET,
  payload: {
    id,
  },
});

export const createPet = (name, type, feeds) => ({
  type: CREATE_PET,
  payload: {
    name,
    type,
    feeds,
  },
});
