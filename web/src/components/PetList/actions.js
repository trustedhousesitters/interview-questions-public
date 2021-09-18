import { getImage } from './services'

export const deletePet = (id) => {
  return {
    type: 'DELETE_PET',
    id
  }
}
export const addPet = name => async (dispatch) => {
  try {
    const imageUrl = await getImage();
    dispatch({
      type: 'ADD_PET',
      name,
      imageUrl: `https://random.dog/${imageUrl}`
    });
  } catch {
    console.log('error')
  }

}
