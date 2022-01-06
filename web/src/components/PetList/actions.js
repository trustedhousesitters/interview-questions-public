export const ADD_PET = 'ADD_PET';
export const REMOVE_PET = 'REMOVE_PET';

export const addPet = pet => {
    return {
        type: 'ADD_PET',
        pet
    }
}

export const removePet = pet => {
    return {
        type: 'REMOVE_PET',
        pet
    }
}