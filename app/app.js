'use strict';

var colors = require('colors/safe');

var team = require('./match/team.js');
var match = require('./match/match.js');
var teamRating = require('./match/team-rating.js');
var league = require('./config/league.json');
var rwFile = require('./read-write-file.js');

setup();
playMatch();
//log();
createReport();

function setup() {
    var teams = rwFile.readTeamOrders();
    global.homeTeam = team.createTeam(
        teams.home.name,
        teams.home.teamrating,
        teams.home.tactic,
        teams.home.playhard,
        teams.home.orders,
        league.homeAdvantage
    );
    global.awayTeam = team.createTeam(
        teams.away.name,
        teams.away.teamrating,
        teams.away.tactic,
        teams.away.playhard,
        teams.away.orders,
        false
    );
}

function setup_ () {
    var homeTeamOrders = [];
    var awayTeamOrders = [];
    global.homeTeam = team.createTeam('por', 1000, 'N', false, homeTeamOrders, league.homeAdvantage);
    global.awayTeam = team.createTeam('bel', 1000, 'N', false, awayTeamOrders, false);
}

function playMatch () {
    match.play();
    teamRating.calculate();
}

function log () {
    logResult();
    logMatch(global.homeTeam);
    logMatch(global.awayTeam);
}

function createReport () {
    var result = global.homeTeam.name + ' '
        + global.homeTeam.match.goals + ' - '
        + global.awayTeam.match.goals + ' '
        + global.awayTeam.name + '\n';

    var homeLog = getReportForTeam(global.homeTeam);
    var awayLog = getReportForTeam(global.awayTeam);
    
    rwFile.writeResult(result + '\n' + homeLog + '\n' + awayLog + '\n');
}

function getReportForTeam (team) {
    return team.name + '\n'
        + 'TR=' + team.teamRating + ' nTR=' + team.newTeamRating + '\n'
        + team.match.actionLog;
}

function logMatch (team) {
    if (team === global.homeTeam) {
        console.log(colors.blue.underline(team.name));
    } else {
        console.log(colors.red.underline(team.name));
    }
    console.log(colors.yellow('TR=' + team.teamRating) + colors.green(' nTR=' + team.newTeamRating));
    console.log(colors.gray(team.match.actionLog));
}

function logResult () {
    var str = 'Result: ';
    str += colors.blue(global.homeTeam.name + ' ' + global.homeTeam.match.goals) + ' - ';
    str += colors.red(global.awayTeam.match.goals + ' ' + global.awayTeam.name);
    console.log(str);
}
