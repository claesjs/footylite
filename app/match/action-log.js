'use strict';

var tactics = require('../config/tactics.json');

exports.writeLog = function () {
    
}

exports.getActionLogGoal = function (min, stoppageTime) {
    var log = "Goal " + min;
    if (stoppageTime > 0) {
        log += "+" + stoppageTime;
    }
    log += "'\n";
    return log;
}

exports.getActionLogConvertedPenalty = function (min, stoppageTime) {
    var log = "Goal " + min;
    if (stoppageTime > 0) {
        log += "+" + stoppageTime;
    }
    log += "' (pen.)\n";
    return log;
}

exports.getActionLogMissedPenalty = function (min, stoppageTime) {
    var log = "Missed penalty " + min;
    if (stoppageTime > 0) {
        log += "+" + stoppageTime;
    }
    log += "'\n";
    return log;
}

exports.getActionLogRedCard = function (min, stoppageTime) {
    var log = "Red card " + min;
    if (stoppageTime > 0) {
        log += "+" + stoppageTime;
    }
    log += "'\n";
    return log;
}

exports.getActionLogChangeTactic = function (min, stoppageTime, tactic) {
    var log = "Changes tactic to " + tactics[tactic].name + " " + min;
    if (stoppageTime > 0) {
        log += "+" + stoppageTime;
    }
    log += "'\n";
    return log;
}

exports.getActionLogChangePlayHard = function (min, stoppageTime, playHard) {
    var log = playHard ? "Starts " : "Stops ";
    log += "to play hard " + min;
    if (stoppageTime > 0) {
        log += "+" + stoppageTime;
    }
    log += "'\n";
    return log;
}

exports.getActionLogShotOnGoal = function (min, stoppageTime) {
    var log = "Shot on goal " + min;
    if (stoppageTime > 0) {
        log += "+" + stoppageTime;
    }
    log += "'\n";
    return log;
}
