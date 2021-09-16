import { v4 as uuidv4 } from 'uuid';
import { DELETE_PET, CREATE_PET, ADD_IMAGE_TO_PET } from './types';
import { generatePet } from '../../../helpers/generatePets';

export const deletePetById = (id) => ({
  type: DELETE_PET,
  payload: {
    id,
  },
});

export const createPet = (name, type, feeds) => ({
  type: CREATE_PET,
  payload: {
    pet: generatePet(uuidv4(), name, type, feeds),
  },
});

export const addImageToPet = (id, url) => ({
  type: ADD_IMAGE_TO_PET,
  payload: {
    id,
    url,
  },
});
