import * as types from '../../app/action-types';

export const deletePet = petId => ({
  type: types.DELETE_PET,
  payload: { petId },
});

export const addPet = pet => ({
  type: types.ADD_PET,
  payload: { pet },
});
