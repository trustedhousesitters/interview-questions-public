export const DELETE_PET = 'DELETE_PET';

export const deletePet = petId => ({
  type: DELETE_PET,
  payload: {
    petId,
  },
});
