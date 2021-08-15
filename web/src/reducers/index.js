import { generatePets } from '../helpers';
import { DELETE_ITEM, ADD_ITEM } from '../constants';

const initialState = {
  pets: generatePets(13),
};

export default function appReducer(state = initialState, { type, payload }) {
  const getItemId = () => {
    const { [state.pets.length - 1]: lastItem } = state.pets;
    return lastItem ? lastItem.id + 1 : 0;
  };

  switch (type) {
    case DELETE_ITEM:
      return {
        ...state,
        pets: state.pets.filter((pet) => pet.id !== payload),
      };
    case ADD_ITEM:
      return {
        ...state,
        pets: [...state.pets, { id: getItemId(), ...payload }],
      };
    default:
      return state;
  }
}
