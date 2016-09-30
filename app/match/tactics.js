'use strict';

/**
 * Tactics config.
 */

var tactics = require('../config/tactics.json');

exports.getTacticsMod = function (tactic) {
    return tactics[tactic].mod;
}

exports.getBonusTacticsMod = function (tactic, oppTactic) {
    var tacticObj = tactics[tactic];
    if (tacticObj.hasOwnProperty('bonus')) {
        var oppTacticObj = tacticObj.bonus[oppTactic];
        if (oppTacticObj) {
            return oppTacticObj.oppmod;
        } else {
            return 1.00;
        }
    } else {
        return 1.00;
    }
}

exports.isLegalTactic = function (tactic) {
    if (tactics[tactic]) {
        return true;
    } else {
        return false;
    }
}
