'use strict';

/**
 * Randomizer.
 */

var seedrandom = require('seedrandom');
var rng = seedrandom(Date.now(), { entropy: true });

exports.roll_10k = function () {
    return rng() * 10000;
	//return Math.random() * 10000;
}

exports.roll_1d6 = function () {
    return Math.floor(rng() * 6) + 1;
    //return Math.floor(Math.random() * 6) + 1;
}
