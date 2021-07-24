import { DELETE_PET, ADD_PET, SET_PET_IMAGE_URL } from './constants';

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

export const setPetImageUrl = (url, id) => {
  return {
    type: SET_PET_IMAGE_URL,
    payload: {
      url,
      id
    }
  };
};
