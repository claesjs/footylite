/**
 * Tests for attack.js.
 */
var attack = require('../../../app/match/attack.js');

describe('testChance', function () {

    // TODO: Stub random and write tests.
    
});

xdescribe('getAttackChance', function () {
    it('should return (8/90) * 10000 for seed 1', function () {
        var expected = (8/90) * 10000;
        expect(attack.getAttackChance(2)).toEqual(expected);
    });

    it('should return (6/90) * 10000 for seed 4', function () {
        var expected = (6/90) * 10000;
        expect(attack.getAttackChance(4)).toEqual(expected);
    });
});
