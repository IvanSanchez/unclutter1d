'use strict';


// Overwrite the "unclutter1d" global if running on Node.
// When running on a browser, the "unclutter1d" global is already define thanks to the IIFE.
if (typeof window === 'undefined') {
    global.unclutter1d = require('../dist/unclutter1d.cjs');
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


    describe("full overlaps", function() {
        it('Two-item full overlap', () => {
            expect(unclutter1d([[10, 10], [10, 10]])).toEqual([[5, 10], [15, 10]]);
        });
        it('Three-item full overlap', () => {
            expect(unclutter1d([[10, 10], [10, 10], [10, 10]])).toEqual([[0, 10], [10, 10], [20, 10]]);
        });

        it('Three-item full overlap plus non-overlapping items', () => {
            expect(unclutter1d(
                [[-100, 2], [10, 10], [10, 10], [10, 10], [100, 2]]
            )).toEqual(
                [[-100, 2], [0, 10], [10, 10], [20, 10], [100, 2]]
            );
        });
    });


    describe("containing overlaps", function() {
        it('Two-item 3+1 overlap', () => {
            expect(unclutter1d(
                [[9, 3], [10, 1]]   // Centered around 10.5
            )).toEqual(
                [[8.5, 3], [11.5, 1]]   // From 8.5 to 12.5, Global center around 10.5
            );
        });
        it('Two-item 1+3 overlap', () => {
            expect(unclutter1d(
                [[10, 1], [9, 3]]   // Centered around 10.5
            )).toEqual(
                [[11.5, 1], [8.5, 3]]   // From 8.5 to 12.5, Global center around 10.5
            );
        });
    });


    describe("rollback", function() {
        it('Roll back to a previous segment if merging lots of nearby segments', () => {
            expect(unclutter1d(
                [[0, 2], [10, 10], [10, 10], [10, 10]]
            )).toEqual(
                [[-4.5, 2], [-2.5, 10], [7.5, 10], [17.5, 10]]
            );
        });
    });


    describe("min-max", function() {
        it('Does not merge items below the specified minimum', () => {
            expect(unclutter1d(
                [[0, 2], [10, 10], [10, 10], [10, 10]],
                0
            )).toEqual(
                [[0, 2], [2, 10], [12, 10], [22, 10]]
            );
        });

        it('Does not merge items over the specified maximum', () => {
            expect(unclutter1d(
                [[0, 2], [10, 10], [10, 10], [10, 10]],
                -Infinity,
                20
            )).toEqual(
                [[-12, 2], [-10, 10], [0, 10], [10, 10]]
            );
        });
    });


});
