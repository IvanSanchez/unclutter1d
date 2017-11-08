
/**
 * unclutter1d
 *
 * Small utility to "unclutter" items (or segments) in a one-dimensional domain.
 *
 * Given N segments of the form [start,length] where start and end are floating-point
 * numbers, this calculates a second set of segments (each of the same length), but
 * offset in such a way that:
 * - no segments overlap (for every pair of segments S1, S2, S1's start is not between
 *   S2's start and start+length, and S1's start+length is not between S2's start and
 *   start+length)
 * - The total offset (sum of the delta of the start value for every segment) is
 *   minimized via a naïve algorithm.
 *
 *
 * The input must be an array of two-item arrays of the form [start, length], e.g.:
 *
 * ```
 * let segments = [[0,2], [1,2], [5,2]];
 * let uncluttered = unclutter1d(segments);
 * ```
 *
 */


export default function unclutter1d(segments, min=-Infinity, max=Infinity) {

    // First pass: create a data structure with: start, total lenght, array of lenghts
    let segs = [];
    let totalLength = 0;
    for (let i in segments) {
        const [ start, length ] = segments[i];
        segs.push(start, length, [length]);
        totalLength += length;
    }

    // Edge case: the items don't fit between min and max
    if (totalLength > (max - min)) {
        /// FIXME!!!
        throw new Error('FIXME');
    }

    let converged = false;

    while (!converged) {
        converged = true;
        let l = segs.length;

//         for (let i=1; i<l; i++) {
//
//         }
    }

    return segs;
}





