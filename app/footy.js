var homeTeam = {
	name: 'Home',
	ranking: 1,
	strategy: 'N',
	aggressive: false,
	scoringChances: 0,
	penaltyKicks: 0,
	penaltyKickGoals: 0,
	goals: 0,
	mins: []
}

var awayTeam = {
	name: 'Away',
	ranking: 1,
	strategy: 'N',
	aggressive: false,
	scoringChances: 0,
	penaltyKicks: 0,
	penaltyKickGoals: 0,
	goals: 0,
	mins: []
}

var initialScoringChances = {
	'1': 9,
	'2': 8,
	'3': 7,
	'4': 6
}

var homeTeamAdvantage = {
	'1': 0,
	'2': 0,
	'3': 0,
	'4': 1,
	'5': 1,
	'6': 1
}

var strategy = {
	'A*': 3,
	'A': 2,
	'N': 0,
	'D': -2,
	'D*': -3
}

var penaltyKicks = {
	'1': 0,
	'2': 0,
	'3': 1,
	'4': 1,
	'5': 1,
	'6': 2
}

var goalSpread = [84, 177, 273, 372, 491, 607, 723, 839, 1000];

var debug = true;

setup();
playMatch();

log('Home ' + homeTeam.goals + ' - ' + awayTeam.goals + ' Away');
log(logMins(homeTeam) + ' - ' + logMins(awayTeam));

function setup() {
	homeTeam.ranking = process.argv[2];
	homeTeam.strategy = process.argv[3];
	homeTeam.aggressive = process.argv[4] === 'Y' ? true : false;

	awayTeam.ranking = process.argv[5];
	awayTeam.strategy = process.argv[6];
	awayTeam.aggressive = process.argv[7] === 'Y' ? true : false;
}

function calculateScoringChances() {
	var strategyMod = strategy[homeTeam.strategy] + strategy[awayTeam.strategy];
	homeTeam.scoringChances = initialScoringChances[homeTeam.ranking] + strategyMod;
	awayTeam.scoringChances = initialScoringChances[awayTeam.ranking] + strategyMod;

	calculateAggressivePlay(homeTeam, awayTeam);
	calculateAggressivePlay(awayTeam, homeTeam);

	calculateHomeTeamAdvantage();
}

function calculateHomeTeamAdvantage() {
	homeTeam.scoringChances += homeTeamAdvantage[roll(6)];
}

function calculateAggressivePlay(team, opponent) {
	if (team.aggressive) {
		var lostScoringChances = roll(6);
		opponent.scoringChances -= lostScoringChances;
		log(team.name + ' lost ' + lostScoringChances + ' scoring chances from opp aggressive play');
		opponent.penaltyKicks = penaltyKicks[roll(6)];
	}

	if (opponent.scoringChances < 0) {
		opponent.scoringChances = 0;
	}
}

function playMatch() {
	calculateScoringChances();
	testScoringChances(homeTeam);
	testScoringChances(awayTeam);
	testPenaltyKicks(homeTeam);
	testPenaltyKicks(awayTeam);
	distributeGoals(homeTeam);
	distributeGoals(awayTeam);
}

function distributeGoals(team) {
	for (var i = 0; i < team.goals; i++) {
		var spreadRoll = roll(1000);
		var min = 0;
		for (var j = 0; j < goalSpread.length; j++) {
			if (spreadRoll <= goalSpread[j]) {
				min = j * 10 + roll(10);
				break;
			}
		}
		team.mins.push(min);
	}
	team.mins.sort(function (a, b) {
		return a > b;
	});
}

function testScoringChances(team) {
	for (var i = 0; i < team.scoringChances; i++) {
		if (scoreGoal()) {
			team.goals++;
		}
	}
}

function scoreGoal() {
	var scoreValue = roll(6);
	if (scoreValue === 6) {
		return true;
	} else if (scoreValue === 5) {
		scoreGoal();
	} else {
		return false;
	}
}

function testPenaltyKicks(team) {
	for (var i = 0; i < team.penaltyKicks; i++) {
		log(team.name + ' penalty: ');
		var penaltyKickValue = roll(6);
		if (penaltyKickValue >= 3) {
			log('  SCORED')
			team.goals++;
			team.penaltyKickGoals++;
		} else {
			log('  MISSED');
		}
	}
}

function roll(max) {
	return 1 + Math.floor(Math.random() * max);
}

function log(s) {
	if (debug) {
		console.log(s);
	}
}

function logMins(team) {
	var minsLog = '';
	for (var i = 0; i < team.mins.length; i++) {
		if (minsLog.length > 0) {
			minsLog += ', ';
		}
		minsLog += team.mins[i] + '\'';
	}
	return minsLog;
}
