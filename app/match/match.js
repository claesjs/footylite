'use strict';

var team = require('./team.js');
var random = require('../random.js');
var penalty = require('./penalty.js');
var redCard = require('./red-card.js');
var attack = require('./attack.js');
var orders = require('./orders.js');

exports.play = function () {
    setupTeams();
    playHalf(0);
    playHalf(45);
}

function setupTeams () {
    team.calculateValues(global.homeTeam, global.awayTeam);
    team.calculateValues(global.awayTeam, global.homeTeam);
}

function playHalf(minOffset) {
    var min = 0 + minOffset;
    var minCounter = 0;
    while (minCounter < 45) {
        min++;
        playMinute(min, 0);
        minCounter++;
    }
    var stoppageTime = calculateStoppageTime();
    var minCounter = 0;
    while (minCounter <= stoppageTime) {
        playMinute(min, minCounter);
        minCounter++;
    }
}

function playMinute (min, stoppageTime) {
    orders.checkOrders(min, stoppageTime);
    team.calculateValues(global.homeTeam, global.awayTeam);
    team.calculateValues(global.awayTeam, global.homeTeam);
    penalty.checkPenalty(min, stoppageTime, getTeams());
    redCard.checkRedCard(min, stoppageTime, getTeams());
    attack.checkAttackChance(min, stoppageTime, getTeams());
}

function calculateStoppageTime () {
    var stoppageTime = 0;
    stoppageTime += global.homeTeam.match.redCards * 0.28;
    stoppageTime += global.awayTeam.match.redCards * 0.28;
    stoppageTime += global.homeTeam.match.goals * 0.28;
    stoppageTime += global.awayTeam.match.goals * 0.28;
    stoppageTime += global.homeTeam.match.penalties * 0.25;
    stoppageTime += global.awayTeam.match.penalties * 0.25;
    stoppageTime += global.homeTeam.match.attacks * 0.10;
    stoppageTime += global.awayTeam.match.attacks * 0.10;
    return Math.round(stoppageTime);
}

function getTeams () {
    var teams = [];
    var roll = random.roll_10k();
    if (roll < 5000) {
        teams.push(global.homeTeam);
        teams.push(global.awayTeam);
    } else {
        teams.push(global.awayTeam);
        teams.push(global.homeTeam);
    }
    return teams;
}
