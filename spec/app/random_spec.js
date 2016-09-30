/**
 * Tests for random.js.
 */
var attackChance = require('../../app/random.js');

describe('roll_10k', function () {
    it('should return a number between 0 and 9999', function () {
        expect(attackChance.roll_10k()).toBeGreaterThan(-1);
        expect(attackChance.roll_10k()).toBeLessThan(9999);
    });
});

describe('roll_1d6', function () {
    it('should return a number between 1 and 6', function () {
        expect(attackChance.roll_1d6()).toBeGreaterThan(0);
        expect(attackChance.roll_1d6()).toBeLessThan(7);
    });
});
