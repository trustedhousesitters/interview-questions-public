import { DELETE_PET } from './constants';

export const deletePet = (id) => {
  return {
    type: DELETE_PET,
    payload: id
  };
};
