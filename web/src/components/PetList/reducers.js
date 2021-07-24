import { generatePets } from '../../helpers/generatePets';
import { DELETE_PET } from './constants';

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
    default:
      return state
  }
}
