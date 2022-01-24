import { generatePets } from '../../helpers/generatePets';

const initialState = {
  pets: generatePets(13),
};

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case 'add': 
      return {
        pets: [...state.pets, action.payload]
      }
    case 'remove':
      return {
        pets: state.pets.filter(x => x.id != action.payload)
      }
    default:
      return state
  }
}
