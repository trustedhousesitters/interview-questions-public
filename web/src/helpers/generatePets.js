import { v4 } from 'uuid';

const PET_NAMES = [
  'Mr. Fluffings',
  'The Whiskertron',
  'Dogbert',
  'Keith',
  'Woofo',
];

const PET_TYPES = ['Dog', 'Cat', 'Antelope', 'Wild Boar', 'Rock'];

export const createPet = ({ name, id }) => ({
  id: id || v4(),
  name: name || PET_NAMES[Math.floor(Math.random() * PET_NAMES.length)],
  type: PET_TYPES[Math.floor(Math.random() * PET_TYPES.length)],
  age: Math.floor(Math.random() * 15),
  feeds: Math.floor(Math.random() * 6) + 1,
});

const generatePets = (numberOfPets = 3) => {
  const petList = [];
  for (let i = 0; i < numberOfPets; i += 1) {
    petList.push(createPet({ id: i }));
  }

  return petList;
};

export { generatePets };
