import { v4 as uuidv4 } from 'uuid';
import { generatePet, generatePets } from '../../../helpers/generatePets';
import { CREATE_PET, DELETE_PET } from './types';

const initialState = {
  pets: generatePets(13),
};

export default function appReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case DELETE_PET: {
      return {
        ...state,
        pets: state.pets.filter((pet) => pet.id !== payload.id),
      };
    }
    case CREATE_PET: {
      return {
        ...state,
        pets: [
          generatePet(uuidv4(), payload.name, payload.type, payload.feeds),
          ...state.pets,
        ],
      };
    }
    default: {
      return state;
    }
  }
}
