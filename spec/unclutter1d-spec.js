'use strict';


// Overwrite the "unclutter1d" global if running on Node.
// When running on a browser, the "unclutter1d" global is already define thanks to the IIFE.
if (typeof window === 'undefined') {
    global.unclutter1d = require('../unclutter1d.cjs');
}

describe("unclutter1d()", function() {

    describe("trivial cases", function() {

        it('Empty input set', () => {
            expect(unclutter1d([])).toEqual([]);
        });
        it('One-item input set', () => {
            expect(unclutter1d([[0, 10]])).toEqual([[0, 10]]);
        });
        it('Two-item non-overlapping input set', () => {
            expect(unclutter1d([[0, 10], [20, 10]])).toEqual([[0, 10], [20, 10]]);
        });
        it('Two-item adjacent input set', () => {
            expect(unclutter1d([[0, 10], [10, 10]])).toEqual([[0, 10], [10, 10]]);
        });
    });

    describe("overlappings", function() {
        it('Two-item complete overlap', () => {
            expect(unclutter1d([[10, 10], [10, 10]])).toEqual([[5, 10], [15, 10]]);
        });
//         it('Three-item complete overlap', () => {
//             expect(unclutter1d([[10, 10], [10, 10], [10, 10]])).toEqual([[0, 10], [10, 10], [20, 10]]);
//         });
    });
});
