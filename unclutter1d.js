
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
 * The input is *assumed* to be ordered, with the starts of each segment in ascending order.
 *
 */


export default function unclutter1d(segments, min=-Infinity, max=Infinity) {

    // First pass: create a data structure with: start, total lenght, array of lenghts
    let groups = [];
    let totalLength = 0;
    for (let i in segments) {
        const [ start, length ] = segments[i];
        groups.push([start, length, [length]]);
        totalLength += length;
    }

    // Edge case: the items don't fit between min and max
    if (totalLength > (max - min)) {
        /// FIXME!!!
        throw new Error('FIXME');
    }

//     let converged = false;
//
//     while (!converged) {
//         converged = true;
    let l = groups.length;

    if (l) {
        for (let i=1; i<l; ) {
            const prevStart  = groups[i-1][0];
            const prevLength = groups[i-1][1];
            const prevEnd    = prevStart + prevLength;
            const currStart  = groups[i  ][0];
            const currLength = groups[i  ][1];

            if (prevEnd > currStart) {
                console.log('overlap: ', prevEnd, currStart);

                const prevItems  = groups[i-1][2];
                const currItems  = groups[i  ][2];
                const prevWeight = prevItems.length;
                const currWeight = currItems.length;
                const prevCenter = prevStart + (prevLength / 2);
                const currCenter = currStart + (currLength / 2);
                const mergedLength = prevLength + currLength;
                const mergedCenter = ((prevCenter * prevWeight) + (currCenter * currWeight)) / (prevWeight + currWeight);
                const mergedStart = mergedCenter - (mergedLength / 2);
                const merged = [ mergedStart, mergedLength, prevItems.concat(currItems) ];

//                 console.log(merged);

                console.log(groups);
                groups.splice(i-1, 2, merged);
                console.log(groups);
                l--;
            } else {
                i++;
            }
        }
    }

    // Final pass: split the groups back into (now adjacent) segments
    l = groups.length;
    let outSegments = [];
    for (let i=0; i<l; i++) {
        const m = groups[i][2].length;
        let groupStart = groups[i][0];
        for (let j=0; j<m; j++) {
            const segmentLength = groups[i][2][j];
            outSegments.push([groupStart, segmentLength]);
            groupStart += segmentLength;
        }
    }

    return outSegments;
}





