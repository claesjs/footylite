'use strict'

var minute = require('../../../app/match/minute.js');

describe('getMinuteMod', function () {
    it('should return mod for minute 12', function () {
        expect(Math.round(minute.getMinuteMod(12)*10000)/10000).toEqual(0.8354);
    });
    
    it('should return mod for minute 4', function () {
        expect(Math.round(minute.getMinuteMod(4)*10000)/10000).toEqual(0.7535);
    });
    
    it('should return mod for minute 60', function () {
        expect(Math.round(minute.getMinuteMod(60)*10000)/10000).toEqual(1.044);
    });
    
    it('should return mod for minute 93', function () {
        expect(Math.round(minute.getMinuteMod(93)*10000)/10000).toEqual(1.4534);
    });
});
