'use strict'

var redCard = require('../../../app/match/red-card.js');

describe('getRedCardChance', function () {
    it('should return red card chance of hard play', function () {
        expect(redCard.getRedCardChance(true)).toEqual((2.9 / 38) / 90 * 10000);
    });
    
    it('should return red card chance of normal play', function () {
        expect(redCard.getRedCardChance(false)).toEqual((0.6 / 38) / 90 * 10000);
    });
});
