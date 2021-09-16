import { generatePets } from '../../../helpers/generatePets';
import { ADD_IMAGE_TO_PET, CREATE_PET, DELETE_PET } from './types';

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
          {
            ...payload.pet,
            imageLoading: true,
          },
          ...state.pets,
        ],
      };
    }
    case ADD_IMAGE_TO_PET: {
      const pets = [...state.pets];
      const petIndex = pets.findIndex((pet) => pet.id === payload.id);

      if (petIndex !== -1) {
        pets[petIndex] = {
          ...state.pets[petIndex],
          imageUrl: payload.url,
          imageLoading: false,
        };
      }

      return {
        ...state,
        pets,
      };
    }
    default: {
      return state;
    }
  }
}
