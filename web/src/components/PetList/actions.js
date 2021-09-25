import * as types from '../../app/action-types';

export const deletePet = petId => ({
  type: types.DELETE_PET,
  payload: { petId },
});
