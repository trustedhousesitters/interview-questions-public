import * as types from '../../app/action-types';
import { generatePets } from '../../helpers/generatePets';

const initialState = {
  pets: generatePets(13),
};

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case types.DELETE_PET: {
      const { petId } = action.payload;
      const pets = [...state.pets];
      const petIndex = pets.findIndex(p => p.id === petId);
      if (petIndex > -1) {
        pets.splice(petIndex, 1);
      }

      return {
        ...state,
        pets,
      }
    }
    default:
      return state
  }
}
