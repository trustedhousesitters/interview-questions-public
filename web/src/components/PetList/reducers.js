import { generatePets } from '../../helpers/generatePets';
import { ADD_PET, DELETE_PET } from './actionTypes';


const initialState = {
  pets: generatePets(13),
};

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_PET:
        return {...state, pets: [...state.pets, action.data]}
    case DELETE_PET:
        return {...state, pets: state.pets.filter(({id}) => id !== action.id)}
    default:
      return state
  }
}
