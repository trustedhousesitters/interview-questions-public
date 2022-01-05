export const ADD_PET = 'ADD_PET';
export const REMOVE_PET = 'REMOVE_PET';

export function addPet(pet) {
    return {
        type: 'ADD_PET',
        pet
    }
}

export function removePet(pet) {
    return {
        type: 'REMOVE_PET',
        pet
    }
}