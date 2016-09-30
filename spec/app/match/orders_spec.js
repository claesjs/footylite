var orders = require('../../../app/match/orders.js');

describe('createOrders', function () {
    it('should create order objects from order lines', function () {
        var orderLines = ['TACTIC A IF MIN = 10', 'TACTIC A IF MIN = 10'];
        var result = orders.createOrders(orderLines);
        expect(result.length).toEqual(2);
    });
});
