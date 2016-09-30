'use strict';

exports.getOppPlayHardMod = function (playHard) {
    if (playHard) {
        return 0.98;
    } else {
        return 1.0;
    }
}

exports.isLegalPlayHardValue = function (playHard) {
    if (playHard === 'Y' || playHard === 'yes' || playHard === 'N' || playHard === 'no') {
        return true;
    } else {
        return false;
    }
}

exports.getPlayHard = function (playHardValue) {
    if (playHardValue === 'Y' || playHardValue === 'yes') {
        return true;
    } else if (playHardValue === 'N' || playHardValue === 'no') {
        return false;
    }
}
