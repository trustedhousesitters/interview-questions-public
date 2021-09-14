import { generatePets } from '../../../helpers/generatePets';
import { DELETE_PET } from "./types";

const initialState = {
  pets: generatePets(13),
};

export default function appReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case DELETE_PET: {
      return {
        ...state,
        pets: state.pets.filter(pet => pet.id !== payload.id)
      };
    }
    default: {
      return state
    }
  }
}
