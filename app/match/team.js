'use strict';

var team = require('../config/team.json');
var attack = require('./attack.js');
var tactics = require('./tactics.js');
var redCard = require('./red-card.js');
var penalty = require('./penalty.js');
var playHard = require('./play-hard.js');
var orders = require('./orders.js');
var actionLog = require('./action-log.js');

var advantageMod = 1.1;

exports.createTeam = function (teamName, teamRating, tactic, playHard, orderLines, hasAdvantage) {
    var teamObj = JSON.parse(JSON.stringify(team));
    teamObj.name = teamName;
    teamObj.teamRating = teamRating;
    teamObj.tactic = tactic;
    teamObj.playHard = playHard;
    teamObj.orders = orders.createOrders(orderLines);
    if (hasAdvantage) {
        teamObj.advantageMod = advantageMod;
    }
    return teamObj;
}

exports.calculateValues = function (teamObj, otherTeamObj) {
    teamObj.oppPlayHardMod = playHard.getOppPlayHardMod(otherTeamObj.playHard);
    teamObj.tacticsMod = tactics.getTacticsMod(teamObj.tactic);
    teamObj.oppTacticsMod = getOppTacticsMod(teamObj, otherTeamObj);
    teamObj.redCardChance = redCard.getRedCardChance(teamObj.playHard);
    teamObj.penaltyChance = penalty.getPenaltyChance(teamObj.playHard);
}

exports.changeTactic = function (team, newTactic, min, stoppageTime) {
    if (team.tactic != newTactic) {
        team.tactic = newTactic;
        team.match.actionLog += actionLog.getActionLogChangeTactic(min, stoppageTime, newTactic);
    }
}

exports.changePlayHard = function (team, newPlayHard, min, stoppageTime) {
    if (team.playHard != newPlayHard) {
        team.playHard = newPlayHard;
        team.match.actionLog += actionLog.getActionLogChangePlayHard(min, stoppageTime, playHard);
    }
}

exports.setAdvantage = function (teamObj, hasAdvantage) {
    teamObj.advantageMod = hasAdvantage ? advantageMod : 1.0;
}

function getOppTacticsMod (teamObj, otherTeamObj) {
    var oppTacticsMod = tactics.getTacticsMod(otherTeamObj.tactic);
    var oppBonusMod = tactics.getBonusTacticsMod(otherTeamObj.tactic, teamObj.tactic);
    return oppTacticsMod * oppBonusMod;
}

function addOrders (teamObj, orders) {
    for (var i = 0; i < orders.length; i++) {
        teamObj.orders.push(orders[i]);
    }
}
