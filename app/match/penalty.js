'use strict';

var random = require('../random.js');
var actionLog = require('./action-log.js');

var penaltyGoalChance = 3;

exports.getPenaltyChance = function (playHard) {
    if (playHard) {
        return (5.9 / 38) / 90 * 10000;
    } else {
        return (2.4 / 38) / 90 * 10000;
    }
}

exports.checkPenalty = function (min, stoppageTime, teams) {
    teamLoop: for (var i = 0; i < 2; i++) {
        if (testPenaltyOccurs(teams[i])) {
            teams[i].match.penalties++;
            if (testPenalty()) {
                teams[i].match.goals++;
                teams[i].match.actionLog += actionLog.getActionLogConvertedPenalty(min, stoppageTime);
            } else {
                teams[i].match.actionLog += actionLog.getActionLogMissedPenalty(min, stoppageTime);
            }
            break teamLoop;
        }
    }
}

function testPenaltyOccurs (team) {
    var roll = random.roll_10k();
    if (roll <= team.penaltyChance) {
        return true;
    } else {
        return false;
    }
}

function testPenalty () {
    var roll = random.roll_1d6();
    if (roll >= penaltyGoalChance) {
        return true;
    }
}
