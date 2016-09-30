'use strict';

var random = require('../random.js');
var actionLog = require('./action-log.js');

var redCardMod = 0.81;

exports.getRedCardChance = function (playHard) {
    if (playHard) {
        return (2.9 / 38) / 90 * 10000;
    } else {
        return (0.6 / 38) / 90 * 10000;
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
