/**
 * Tests for team.js.
 */
var team = require('../../../app/match/team.js');

describe('createTeam', function () {
    it('should return a new team obj with advantage mod higher than 1', function () {
        var teamObj = team.createTeam('teamName', 1000, 'N', true, ['TACTIC A IF MIN = 0'], true);
        expect(teamObj.name).toEqual('teamName');
        expect(teamObj.teamRating).toEqual(1000);
        expect(teamObj.tactic).toEqual('N');
        expect(teamObj.playHard).toEqual(true);
        expect(teamObj.orders.length).toEqual(1);
        expect(teamObj.advantageMod).toEqual(1.1);
    });

    it('should return a new team obj with default advantage mod', function () {
        var teamObj = team.createTeam('teamName', 1000, 'N', true, ['TACTIC A IF MIN = 0'], false);
        expect(teamObj.name).toEqual('teamName');
        expect(teamObj.teamRating).toEqual(1000);
        expect(teamObj.tactic).toEqual('N');
        expect(teamObj.playHard).toEqual(true);
        expect(teamObj.orders.length).toEqual(1);
        expect(teamObj.advantageMod).toEqual(1.0);
    });
});
