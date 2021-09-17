export const deletePet = (id) => {
  return {
    type: 'DELETE_PET',
    id
  }
}
export const addPet = name => {
  console.log('action', name)
  return {
    type: 'ADD_PET',
    name
  }
}
