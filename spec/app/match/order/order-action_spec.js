var orderAction = require('../../../../app/match/order/order-action.js');

describe('createActionTactic', function () {
    it('should update action object with tactic', function () {
        var orderObj = {
            action: {
                name: '',
                value: ''
            }
        };
        var actionArr = ['TACTIC', 'A'];
        orderAction.createActionTactic(orderObj, actionArr);
        expect(orderObj.action.name).toEqual('TACTIC');
        expect(orderObj.action.value).toEqual('A');
    });
});

describe('createActionPlayHard', function () {
    var orderObj = {
        action: {
            name: '',
            value: ''
        }
    };
    
    it('should update action object with play hard equal to true', function () {
        var actionArr = ['PLAYHARD', 'Y'];
        orderAction.createActionPlayHard(orderObj, actionArr);
        expect(orderObj.action.name).toEqual('PLAYHARD');
        expect(orderObj.action.value).toEqual(true);
    });

    it('should update action object with play hard equal to false', function () {
        var actionArr = ['PLAYHARD', 'N'];
        orderAction.createActionPlayHard(orderObj, actionArr);
        expect(orderObj.action.name).toEqual('PLAYHARD');
        expect(orderObj.action.value).toEqual(false);
    });
});
