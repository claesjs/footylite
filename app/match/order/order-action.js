var tactics = require('../tactics.js');
var playHard = require('../play-hard.js');

exports.createActionTactic = function (orderObj, actionArr) {
    if (!tactics.isLegalTactic(actionArr[1])) {
        console.log('Invalid tactic');
        return;
    }
    orderObj.action.name = actionArr[0];
    orderObj.action.value = actionArr[1];
}

exports.createActionPlayHard = function (orderObj, actionArr) {
    if (!playHard.isLegalPlayHardValue(actionArr[1])) {
        console.log('Invalid playhard value');
        return;
    }
    orderObj.action.name = actionArr[0];
    orderObj.action.value = playHard.getPlayHard(actionArr[1]);
}
