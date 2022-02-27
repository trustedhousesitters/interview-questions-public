const DELETE_PET_ITEM = "DELETE_PET_ITEM";
const ADD_PET_ITEM = "ADD_PET_ITEM";

export const deletePetItem = (id) => {
  return {
    type: DELETE_PET_ITEM,
    payload: id,
  };
};

export const addPetItem = (petItem) => {
  return {
    type: ADD_PET_ITEM,
    payload: petItem,
  };
};
