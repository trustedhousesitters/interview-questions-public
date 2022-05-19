import { createPet } from './generatePets';

describe('helpers/generatePets', () => {
  describe('createPet', () => {
    it('should return the expected output', () => {
      const feeds = 5;
      const id = 'dummyId';
      const imageUrl = 'dummyUrl';
      const name = 'dummyName';
      const type = 'dummyType';

      const response = createPet({ feeds, id, imageUrl, name, type });

      expect(response.feeds).toBe(feeds);
      expect(response.id).toBe(id);
      expect(response.imageUrl).toBe(imageUrl);
      expect(response.name).toBe(name);
      expect(response.type).toBe(type);
    });
  });
});
