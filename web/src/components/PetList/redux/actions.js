import { DELETE_PET } from "./types";

export const deletePetById = id => ({
    type: DELETE_PET,
    payload: {
        id
    }
})