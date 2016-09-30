var SEPARATOR = ' ';
var ACTION_TACTIC = 'TACTIC';
var ACTION_PLAYHARD = 'PLAYHARD';
var CONDITION_MIN = 'MIN';
var CONDITION_SCORE = 'SCORE';

exports.isActionTactic = function (action) {
    return ACTION_TACTIC === action;
}

exports.isActionPlayHard = function (action) {
    return ACTION_PLAYHARD === action;
}

exports.isConditionMin = function (condition) {
    return CONDITION_MIN === condition;
}

exports.isConditionScore = function (condition) {
    return CONDITION_SCORE === condition;
}
