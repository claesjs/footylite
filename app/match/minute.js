'use strict';

var goalSpread = [1831, 2030, 2099, 2175, 2598, 2536, 2537, 2533, 3532];

var sum = 0;
goalSpread.forEach(function (n) {
    sum += n;
});

var average = sum / goalSpread.length;

exports.getMinuteMod = function (minute) {
    var index = (minute - (minute % 10)) / 10;
    if (index === goalSpread.length) {
        index = goalSpread.length - 1;
    }
    return goalSpread[index] / average;
}
