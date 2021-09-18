export const ADD_PET = 'ADD_PET';
export const DELETE_PET = 'DELETE_PET';

export const deletePet = petId => ({
  type: DELETE_PET,
  payload: {
    petId,
  },
});

export const addPet = petDetails => ({
  type: ADD_PET,
  payload: {
    petDetails,
  },
});
