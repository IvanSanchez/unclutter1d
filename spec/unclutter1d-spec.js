'use strict';

let unclutter1d = require('../unclutter1d');

describe("unclutter1d()", function() {

    describe("trivial cases", function() {

        it('Empty input set', () => {
            expect(unclutter1d([])).toEqual([]);
        });
        it('One-item input set', () => {
            expect(unclutter1d([[0, 10]])).toEqual([[0, 10]]);
        });

    });
});
