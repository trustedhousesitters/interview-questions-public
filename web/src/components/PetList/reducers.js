import { generatePets } from '../../helpers/generatePets';

const initialState = {
  pets: generatePets(13),
};

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case "REMOVE_PET":
      return {
        pets: [
          ...state.pets.filter((pet) => pet !== action.payload),
        ], 
      }
    case "ADD_PET":
      return {
        pets: [
          ...state.pets,
          {
            id: state.pets.length++,
            ...action.payload
          },
        ], 
      }
    default:
      return state
  }
}
