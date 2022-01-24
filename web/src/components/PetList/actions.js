export const addPet = pet => {
    return {
        type: 'add',
        payload: pet
    }
}

export const removePet = petId => {
    return {
        type: 'remove',
        payload: petId
    }
} 