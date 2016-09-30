'use strict';

var colors = require('colors/safe');

var team = require('./match/team.js');
var match = require('./match/match.js');

sim();

function sim () {
    var start = new Date().getTime();
    
    var args = process.argv.slice(2);
    if (args.length !== 1) {
        console.log(colors.red('Wrong number of arguments'));
        process.exit();
    }
    
    var matches = args[0];
    
    var homeWins = 0;
    var awayWins = 0;
    var ties = 0;
    var goals = 0;
    var homePts = 0;
    var awayPts = 0;
    
    var homeTeamOrders = [];
    var awayTeamOrders = [];
    
    for (var i = 0; i < matches; i++) {
        global.homeTeam = team.createTeam('Home', 842, 'N', false, homeTeamOrders, false);
        global.awayTeam = team.createTeam('Away', 1181, 'N', false, awayTeamOrders, false);
        match.play();
        if (global.homeTeam.match.goals > global.awayTeam.match.goals) {
            homeWins++;
            homePts += 3;
        } else if (global.homeTeam.match.goals === global.awayTeam.match.goals) {
            ties++;
            homePts += 1;
            awayPts += 1;
        } else {
            awayWins++;
            awayPts += 3;
        }
        goals += global.homeTeam.match.goals + global.awayTeam.match.goals;
    }
    
    console.log('Home =' + colors.blue(homeWins/matches + ' (' + homePts/matches + ' pts)'));
    console.log('Away =' + colors.red(awayWins/matches + ' (' + awayPts/matches + ' pts)'));
    console.log('Ties =' + colors.cyan(ties/matches));
    console.log('Goals=' + colors.yellow(goals / matches));
    
    var end = new Date().getTime();
    var time = end - start;
    console.log('Time =' + colors.yellow(time + ' ms'));
}
