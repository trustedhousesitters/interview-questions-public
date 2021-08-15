import { PET_NAMES, PET_TYPES } from '../constants';

// extracted to helper so it can be used in PetList as well
const generateNumber = (multiplier, addition = 0) =>
  Math.floor(Math.random() * multiplier) + addition;

const generatePets = (numberOfPets = 3) => {
  const petList = [];
  for (let i = 0; i < numberOfPets; i += 1) {
    petList.push({
      id: i,
      name: PET_NAMES[generateNumber(PET_NAMES.length)],
      type: PET_TYPES[generateNumber(PET_TYPES.length)],
      age: generateNumber(15),
      feeds: generateNumber(6, 1),
    });
  }

  return petList;
};

const getItemId = (state) => {
  const { [state.pets.length - 1]: lastItem } = state.pets;
  return lastItem ? lastItem.id + 1 : 0;
};

export { generatePets, generateNumber, getItemId };
