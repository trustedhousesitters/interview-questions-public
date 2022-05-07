import { generatePets } from '../../helpers/generatePets';
import { DELETE_PET } from './actionTypes';


const initialState = {
  pets: generatePets(13),
};

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case DELETE_PET:
        return {...state, pets: state.pets.filter(({id}) => id !== action.id)}
    default:
      return state
  }
}
