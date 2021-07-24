import { DELETE_PET, ADD_PET } from './constants';

export const deletePet = (id) => {
  return {
    type: DELETE_PET,
    payload: id
  };
};

export const addPet = (pet) => {
  return {
    type: ADD_PET,
    payload: pet
  };
};
