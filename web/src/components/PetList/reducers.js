import { generatePet, generatePets } from '../../helpers/generatePets';

const initialState = {
  pets: generatePets(13),
};

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case 'DELETE_PET':
      const deletedPet = state.pets.filter(item => item.id !== action.id)
      return { ...state, pets: deletedPet };
    case 'ADD_PET':
      const newPet = generatePet(state.pets.length + 1, action.name);
      const addedPet = [newPet, ...state.pets]
      return { ...state, pets: addedPet };
    default:
      return state
  }
}
