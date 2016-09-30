'use strict';

var random = require('../random.js');
var minute = require('./minute.js');
var actionLog = require('./action-log.js');

var goalChance = 1452;

exports.checkAttackChance = function (min, stoppageTime, teams) {
    teamLoop: for (var i = 0; i < 2; i++) {
        if (testAttackOccurs(teams[i], min)) {
            teams[i].match.attacks++;
            if (testChance()) {
                teams[i].match.goals++;
                teams[i].match.actionLog += actionLog.getActionLogGoal(min, stoppageTime);
                break teamLoop;
            } else {
                teams[i].match.actionLog += actionLog.getActionLogShotOnGoal(min, stoppageTime);
            }
        }
    }
}

function testAttackOccurs (team, min) {
    var attackChance = getAttackChance(team, min);
    var roll = random.roll_10k();
    if (roll <= attackChance) {
        return true;
    } else {
        return false;
    }
}

function testChance () {
    var roll = random.roll_10k();
    if (roll < goalChance) {
        // Goal scored
        return true;
    } else {
        // Missed
        return false;
    }
}

function getAttackChance (team, min) {
    var attackChance = team.teamRating * 0.5;
    attackChance *= team.tacticsMod;
    attackChance *= team.oppTacticsMod;
    attackChance *= team.oppPlayHardMod;
    attackChance *= team.redCardMod;
    attackChance *= team.advantageMod;
    attackChance *= minute.getMinuteMod(min);
    return attackChance;
}
