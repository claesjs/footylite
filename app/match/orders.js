'use strict';

var orderCreator = require('./order/order-creator.js');
var orderChecker = require('./order/order-checker.js');

/*

TACTIC [new tactic]
PLAYHARD [yes or no]

IF MIN [sign] [minute]
IF SCORE [sign] [score]

TACTIC A IF MIN > 45, SCORE =< -1

*/

exports.createOrders = function (orderLines) {
    var orders = [];
    for (var i = 0; i < orderLines.length; i++) {
        orders.push(orderCreator.createOrderObj(orderLines[i]));
    }
    return orders;
}

exports.checkOrders = function (min, stoppageTime) {
    orderChecker.checkOrderForTeam(global.homeTeam, min, stoppageTime);
    orderChecker.checkOrderForTeam(global.awayTeam, min, stoppageTime);
}
