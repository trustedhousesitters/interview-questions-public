const petReducer = (state, action) => {
  switch (action.type) {
    case "SET_PETS":
      return action.payload || [];
    case "ADD_PET":
      return [...state, action.payload];
    case "REMOVE_PET":
      return state.filter((pet) => pet.id !== action.payload);
    default:
      return state;
  }
};

export default petReducer;