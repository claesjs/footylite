var condition = require('../../config/condition.json');

exports.createCondition = function (conditionArr) {
    if (conditionArr.length != 3) {
        console.log('Invalid condition');
        return;
    }
    if (!isLegalSign(conditionArr[1])) {
        console.log('Invalid sign');
        return;
    }
    if (!isLegalValue(conditionArr[2])) {
        console.log('Invalid value');
        return;
    }
    var conditionObj = JSON.parse(JSON.stringify(condition));
    conditionObj.condition = conditionArr[0];
    conditionObj.sign = convertConditionSign(conditionArr[1]);
    conditionObj.value = parseInt(conditionArr[2], 10);
    return conditionObj;
}

function convertConditionSign (sign) {
    if (sign === '=') {
        return '===';
    } else {
        return sign;
    }
}

function isLegalSign (sign) {
    if (sign === '=' || sign === '>=' || sign === '=>' || sign === '>' ||
            sign === '<=' || sign === '=<' || sign === '<') {
        return true;
    } else {
        return false;
    }
}

function isLegalValue (value) {
    if (isNaN(value)) {
        return false;
    } else {
        return true;
    }
}
