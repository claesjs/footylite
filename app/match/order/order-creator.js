var order = require('../../config/order.json');
var orderAction = require('./order-action.js');
var orderCondition = require('./order-condition.js');
var orderLine = require('./order-line.js');

var IF = 'IF';

exports.createOrderObj = function (orderLineObj) {
    var idx = orderLineObj.indexOf(IF);
    if (idx < -1) {
        console.log('IF statement not found');
        return;
    }
    
    var actionStr = orderLineObj.substring(0, idx).trim();
    var conditionsStr = orderLineObj.substring(idx + 3, orderLineObj.length).trim();
    
    var orderObj = JSON.parse(JSON.stringify(order));
    
    // Action
    var actionArr = actionStr.split(' ');
    if (actionArr.length != 2) {
        console.log('Badly formed condition');
        return;
    }
    var actionResult;
    if (orderLine.isActionTactic(actionArr[0])) {
        actionResult = orderAction.createActionTactic(orderObj, actionArr);
    } else if (orderLine.isActionPlayHard(actionArr[0])) {
        actionResult = orderAction.createActionPlayHard(orderObj, actionArr);
    } else {
        console.log('Invalid action');
        return;
    }
    if (actionResult === 'undefined') {
        return;
    }
    
    // Conditions
    var conditionsArr = conditionsStr.split(',');
    for (var i = 0; i < conditionsArr.length; i++) {
        var conditionArr = conditionsArr[i].trim().split(' ');
        orderObj.conditions.push(orderCondition.createCondition(conditionArr));
    }
    
    return orderObj;
}
