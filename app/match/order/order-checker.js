var orderLine = require('./order-line.js');
var team = require('../team.js');

exports.checkOrderForTeam = function (teamObj, min, stoppageTime) {
    teamObj.orders.forEach(function (order) {
        var compositeConditon = order.conditions.length > 1;
        var minuteCond = false;
        var scoreCond = false;
        order.conditions.forEach(function (conditionObj) {
            if (orderLine.isConditionMin(conditionObj.condition)
                    && checkConditionMinute(min, conditionObj)) {
                minuteCond = true;
            } else if (orderLine.isConditionScore(conditionObj.condition)
                    && checkConditionScore(getScore(teamObj), conditionObj)) {
                scoreCond = true;
            }
        });
        if (compositeConditon && minuteCond && scoreCond) {
            checkAction(teamObj, order, min, stoppageTime);
        } else if (!compositeConditon && (minuteCond || scoreCond)) {
            checkAction(teamObj, order, min, stoppageTime);
        }
    });
}

function checkConditionMinute (min, condition) {
    return eval(min + ' ' + condition.sign + ' ' + condition.value);
}

function checkConditionScore (score, condition) {
    return eval(score + ' ' + condition.sign + ' ' + condition.value);
}

function getScore (teamObj) {
    if (teamObj.name === global.homeTeam.name) {
        return global.homeTeam.match.goals - global.awayTeam.match.goals;
    } else {
        return global.awayTeam.match.goals - global.homeTeam.match.goals;
    }
}

function checkAction (teamObj, order, min, stoppageTime) {
    if (orderLine.isActionTactic(order.action.name)) {
        team.changeTactic(teamObj, order.action.value, min, stoppageTime);
    } else if (orderLine.isActionPlayHard(order.action.name)) {
        team.changePlayHard(teamObj, order.action.value, min, stoppageTime);
    }
}
