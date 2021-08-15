import { generatePets, getItemId } from '../helpers';
import { DELETE_ITEM, ADD_ITEM } from '../constants';

const initialState = {
  pets: generatePets(13),
};

export default function appReducer(state = initialState, { type, payload }) {
  switch (type) {
    case DELETE_ITEM:
      return {
        ...state,
        pets: state.pets.filter((pet) => pet.id !== payload),
      };
    case ADD_ITEM:
      return {
        ...state,
        pets: [...state.pets, { id: getItemId(state), ...payload }],
      };
    default:
      return state;
  }
}
