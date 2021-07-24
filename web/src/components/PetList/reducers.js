import { generatePets } from '../../helpers/generatePets';
import { ADD_PET, DELETE_PET, SET_PET_IMAGE_URL } from './constants';

const initialState = {
  pets: generatePets(13),
};

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case DELETE_PET:
      return {
        ...state,
        pets: state.pets.filter(pet => pet.id !== action.payload)
      }
    case ADD_PET:
      return {
        ...state,
        pets: [action.payload, ...state.pets]
      }
    case SET_PET_IMAGE_URL:
      const { pets } = state;
      const index = pets.findIndex(pet => pet.id === action.payload.id);
      const pet = pets[index];

      const updatedPets = [
        ...pets.slice(0, index),
        {
          ...pet,
          imageUrl: action.payload.url
        },
        ...pets.slice(index+1)
      ];
      return {
        ...state,
        pets: updatedPets
      }
    default:
      return state
  }
}
