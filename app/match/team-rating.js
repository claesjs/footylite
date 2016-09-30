'use strict';

exports.calculate = function () {
    calculateNewTeamRating(global.homeTeam, global.awayTeam);
    calculateNewTeamRating(global.awayTeam, global.homeTeam);
}

function calculateNewTeamRating (team, otherTeam, goalIndex) {
    var goalDifference = Math.abs(team.match.goals - otherTeam.match.goals);
    var goalIndex = getGoalIndex(goalDifference);
    var matchWeight = 50;
    var matchResult = getMatchResult(team, otherTeam);
    var expectedMatchResult = getExpectedMatchResult(team, otherTeam);
    team.newTeamRating = Math.round(team.teamRating + matchWeight * goalIndex * (matchResult - expectedMatchResult));    
}

function getGoalIndex (goalDifference) {
    if (goalDifference <= 1) {
        return 1.0;
    } else if (goalDifference === 2) {
        return 2/3;
    } else {
        return (11 + goalDifference) / 8;
    }
}

function getMatchResult (team, otherTeam) {
    if (team.match.goals > otherTeam.match.goals) {
        return 1.0;
    } else if (team.match.goals === otherTeam.match.goals) {
        return 0.5;
    } else {
        return 0;
    }
}

function getExpectedMatchResult (team, otherTeam) {
    var dr = -(team.teamRating - otherTeam.teamRating);
    return 1 / (Math.pow(10, (dr / 400)) + 1);
}
