import {GeneratePets} from './petGenerator';

export const DELETE_PET = 'DELETE_PET';

const initialState = {
  pets: GeneratePets(),
};

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case DELETE_PET:
      const index = state.pets.findIndex(pet => pet.id === action.payload.petId);
      const newPetsArray = [...state.pets.slice(0, index), ...state.pets.slice(index + 1)];
      return {
        ...state,
        pets: newPetsArray,
      };
    default:
      return state;
  }
}
