export const createPet = async (pet) => {
  const test = await fetch("https://random.dog/woof?include=png").then(
    (response) => response.text()
  );

  pet.id = Date.now();
  pet.imageUrl = `https://random.dog/${test}`;
  return pet;
};
