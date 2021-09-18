import constants from './constants';

const GeneratePets = (numberOfPets = 3) => {
  const petList = [];
  for (let i = 0; i < numberOfPets; i += 1) {
    petList.push({
      id: i,
      name: constants.PET_NAMES[
        Math.floor(Math.random() * constants.PET_NAMES.length)
      ],
      type: constants.PET_TYPES[
        Math.floor(Math.random() * constants.PET_TYPES.length)
      ],
      feeds: Math.floor(Math.random() * 6) + 1,
    });
  }

  return petList;
};

export {GeneratePets};
