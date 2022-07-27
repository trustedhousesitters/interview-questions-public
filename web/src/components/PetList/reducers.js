import { PET_ADDED, PET_DELETED } from '../../app/actions';
import { fetchPetImageUrl } from '../../app/api';
import { generatePets } from '../../helpers/generatePets';

const initialState = {
    pets: generatePets(13),
};

export default function appReducer(state = initialState, action) {
    switch (action.type) {
        case PET_DELETED: {
            const pets = state.pets.filter((pet) => pet.id !== action.id);
            return {
                ...state,
                pets,
            };
        }
        case PET_ADDED: {
            const id = state.pets.length;
            const pets = [...state.pets, { ...action.pet, id }];
            return {
                ...state,
                pets,
            };
        }
        default:
            return state;
    }
}

export function addNewPet(pet) {
    return async function addNewPetThunk(dispatch, _getState) {
        const imageUrl = await fetchPetImageUrl();
        dispatch({
            type: PET_ADDED,
            pet: {
                ...pet,
                imageUrl,
            },
        });
    };
}
