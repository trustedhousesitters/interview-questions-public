import { ADD_PET, DELETE_PET } from "./actionTypes";

export const addPet = data => {
    return { type: ADD_PET, data }
}

export const deletePet = id => {
    return { type: DELETE_PET, id }
}