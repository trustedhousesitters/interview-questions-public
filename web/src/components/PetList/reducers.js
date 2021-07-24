import { generatePets } from '../../helpers/generatePets';
import { ADD_PET, DELETE_PET } from './constants';

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
    default:
      return state
  }
}
