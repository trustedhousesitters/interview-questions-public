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
    case types.ADD_PET: {
      const { pet } = action.payload;
      const highestId = Math.max(...state.pets.map(p => p.id));
      const pets = [{ ...pet, id: highestId + 1 }, ...state.pets];

      return {
        ...state,
        pets,
      }
    }
    default:
      return state
  }
}
