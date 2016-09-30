'use strict'

var playHard = require('../../../app/match/play-hard.js');

describe('getOppPlayHardMod', function () {
    it('should return mod for hard play', function () {
        expect(playHard.getOppPlayHardMod(true)).toEqual(0.98);
    });
    
    it('should return mod for normal play', function () {
        expect(playHard.getOppPlayHardMod(false)).toEqual(1.0);
    });
});
