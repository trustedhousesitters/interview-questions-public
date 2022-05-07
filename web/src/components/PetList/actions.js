import { DELETE_PET } from "./actionTypes";

export const deletePet = id => {
    return { type: DELETE_PET, id }
}