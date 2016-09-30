/**
 * Tests for tactics.js.
 */
var tactics = require('../../../app/match/tactics.js');

describe('getTacticsMod', function () {
    it('should return 1.00 for tactic N', function () {
        expect(tactics.getTacticsMod('N')).toEqual(1.00);
    });

    it('should return 0.94 for tactic N', function () {
        expect(tactics.getTacticsMod('C')).toEqual(0.94);
    });
});

describe('getBonusTacticsMod', function () {
    it('should return 0.89 for tactic L and opponent tactic C', function () {
        expect(tactics.getBonusTacticsMod('L', 'C')).toEqual(0.89);
    });

    it('should return 0.89 for tactic C and opponent tactic A', function () {
        expect(tactics.getBonusTacticsMod('C', 'A')).toEqual(0.89);
    });

    it('should return 1.00 for tactic N and opponent tactic A', function () {
        expect(tactics.getBonusTacticsMod('N', 'C')).toEqual(1.00);
    });
});

describe('isLegalTactic', function () {
    it('should return true if tactic is defined in tactics.json', function () {
        expect(tactics.isLegalTactic('N')).toEqual(true);
    });
    
    it('should return false if tactic is NOT defined in tactics.json', function () {
        expect(tactics.isLegalTactic('NOT_LEGAL')).toEqual(false);
    });
});
