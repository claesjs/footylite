'use strict';

var team = require('./match/team.js');
var match = require('./match/match.js');
var teamRating = require('./match/team-rating.js');
var orders = require('./match/orders.js');

setup();

function setup () {
    var teamA = team.createTeam('Claes', 1000, 'N', false, ['TACTIC D IF SCORE >= 1'],['TACTIC A IF SCORE <= -1'], false);
    var teamB = team.createTeam('Johan', 1000, 'N', false, [], false);
    var teamC = team.createTeam('Frinns', 1000, 'N', false, [], false);
    var teamD = team.createTeam('Adam', 1000, 'N', false, [], false);
    var teamE = team.createTeam('Jonas', 1000, 'N', false, [], false);
    var teamF = team.createTeam('Eric', 1000, 'N', false, [], false);
    var teams = [teamA, teamB, teamC, teamD, teamE, teamF];
    setupTeams(teams);

    var schedule = [
        [teamA, teamF], [teamB, teamE], [teamC, teamD],
        [teamE, teamA], [teamF, teamD], [teamB, teamC],
        [teamA, teamD], [teamE, teamC], [teamF, teamB],
        [teamC, teamA], [teamD, teamB], [teamE, teamF],
        [teamA, teamB], [teamC, teamF], [teamD, teamE],
        [teamF, teamA], [teamE, teamB], [teamD, teamC],
        [teamA, teamE], [teamD, teamF], [teamC, teamB],
        [teamD, teamA], [teamC, teamE], [teamB, teamF],
        [teamA, teamC], [teamB, teamD], [teamF, teamE],
        [teamB, teamA], [teamF, teamC], [teamE, teamD],
    ];
        
    for (var i = 0; i < schedule.length; i++) {
        var homeTeam = schedule[i][0];
        var awayTeam = schedule[i][1];
        playMatch(homeTeam, awayTeam);
        homeTeam.teamRating = global.homeTeam.newTeamRating;
        awayTeam.teamRating = global.awayTeam.newTeamRating;
        updateLeagueStats(homeTeam, awayTeam);
        clearMatchLog(homeTeam);
        clearMatchLog(awayTeam);
    }
    
    teams.sort(function (a, b) {
        if (a.points === b.points) {
            return b.goalDiff - a.goalDiff;
        } else {
            return b.points - a.points;
        }
    });
    
    console.log('Team\tPts\tGD\tTR');
    for (var i = 0; i < teams.length; i++) {
        console.log(teams[i].name + '\t' + teams[i].points + '\t' + teams[i].goalDiff + '\t' + teams[i].teamRating);
    }
}

function setupTeams (teams) {
    for (var i = 0; i < teams.length; i++) {
        teams[i].points = 0;
        teams[i].goalDiff = 0;
    }
}

function updateLeagueStats (homeTeam, awayTeam) {
    if (homeTeam.match.goals > awayTeam.match.goals) {
        homeTeam.points += 3;
    } else if (homeTeam.match.goals === awayTeam.match.goals) {
        homeTeam.points += 1;
        awayTeam.points += 1;
    } else {
        awayTeam.points += 3;
    }
    homeTeam.goalDiff += homeTeam.match.goals - awayTeam.match.goals;
    awayTeam.goalDiff += awayTeam.match.goals - homeTeam.match.goals;
}

function clearMatchLog (team) {
    team.match = {
        'attacks': 0,
        'goals': 0,
        'penalties': 0,
        'redCards': 0,
        'actionLog': ''
    };
}

function playMatch (homeTeam, awayTeam) {
    team.setAdvantage(homeTeam, true);
    team.setAdvantage(awayTeam, false);
    
    global.homeTeam = homeTeam;
    global.awayTeam = awayTeam;
    
    match.play();
    teamRating.calculate();
    
    logResult();
    logMatch(global.homeTeam);
    logMatch(global.awayTeam);
    //console.log('');
}

function logMatch (team) {
    //console.log(team.name + ' (TR=' + team.teamRating + ' nTR=' + team.newTeamRating + ')');
    //console.log(team);
    //console.log(team.match.actionLog);
}

function logResult () {
    var str = 'Result: ';
    str += global.homeTeam.name + ' ' + global.homeTeam.match.goals + ' - ';
    str += global.awayTeam.match.goals + ' ' + global.awayTeam.name;
    console.log(str);
}
