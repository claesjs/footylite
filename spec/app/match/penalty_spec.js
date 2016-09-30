'use strict'

var penalty = require('../../../app/match/penalty.js');

describe('getPenaltyChance', function () {
    it('should return penalty chance of hard play', function () {
        expect(penalty.getPenaltyChance(true)).toEqual((5.9 / 38) / 90 * 10000);
    });
    
    it('should return penalty chance of normal play', function () {
        expect(penalty.getPenaltyChance(false)).toEqual((2.4 / 38) / 90 * 10000);
    });
});
