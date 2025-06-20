import { generatePets } from "@/mocks/generatePets";

const initialState = {
  pets: generatePets(13),
};

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
