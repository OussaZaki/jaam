import { pickRandomly } from './pickRandomly';

describe('core | quiz | helpers', () => {
  describe('pickRandomly', () => {
    it('should 1', () => {
      const array = ['🍎', '🥝', '🍌', '🍊', '🍇'];

      // Act
      const randomPick = pickRandomly(array, 3);

      // Assert
      expect(randomPick.length).toEqual(4);
    });
  });
});
