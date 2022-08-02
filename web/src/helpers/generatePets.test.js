import { generatePets } from './generatePets';

test('should genderate the correct number of pets', () => {
    expect(generatePets()).toHaveLength(3);
    expect(generatePets(0)).toHaveLength(0);
    expect(generatePets(100)).toHaveLength(100);
    expect(generatePets(-1)).toHaveLength(0);
});

/** Given more time, a fuzz test would be better suited here */
test('should genderate a pet', () => {
    const [pet] = generatePets(1);

    expect(pet.id).toEqual(expect.any(Number));
    expect(pet.age).toEqual(expect.any(Number));
    expect(pet.feeds).toEqual(expect.any(Number));
    expect(pet.name).toEqual(expect.any(String));
    expect(pet.type).toEqual(expect.any(String));
});