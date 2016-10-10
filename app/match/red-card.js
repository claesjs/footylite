'use strict';

var random = require('../random.js');
var actionLog = require('./action-log.js');

var redCardMod = 0.81;
var redCardChancePlayHard = 8.47953216374269; // (2.9 / 38) / 90 * 10000;
var redCardChance = 1.7543859649122808; // (0.6 / 38) / 90 * 10000;

exports.getRedCardChance = function (playHard) {
    if (playHard) {
        return redCardChancePlayHard;
    } else {
        return redCardChance;
    }
}

exports.checkRedCard = function (min, stoppageTime, teams) {
    teamLoop: for (var i = 0; i < 2; i++) {
        if (testRedCard(teams[i])) {
            teams[i].match.redCards++;
            teams[i].match.actionLog += actionLog.getActionLogRedCard(min, stoppageTime);
            teams[i].redCardMod *= redCardMod;
            break teamLoop;
        }
    }
}

function testRedCard (team) {
    var roll = random.roll_10k();
    if (roll <= team.redCardChance) {
        return true;
    } else {
        return false;
    }
}
