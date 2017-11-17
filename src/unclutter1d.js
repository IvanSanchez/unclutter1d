
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

    // First pass: create a data structure with: start, total lenght, array
    // of (lenght, index)s
    let groups = [];
    let totalLength = 0;
    for (let i in segments) {
        const [ start, length ] = segments[i];
        groups.push([start, length, [length, i]]);
        totalLength += length;
    }

    groups = groups.sort(function(a,b){ return a[0] - b[0]; });
    let l = groups.length;
    let outSegments = [];

    // Edge case: the items don't fit between min and max
    if (totalLength > (max - min)) {

        // Squeeze all elements by a ratio, and return them together.
        const ratio = totalLength / (max - min);
        let start = min;

        for (let i=0; i<l; i++) {
            const segmentLength = segments[i][1] / ratio;
            outSegments.push([ start, segmentLength ]);
            start += segmentLength;
        }
        return outSegments;
    }


    // Main pass: check if each item is overlapping with the previous one.
    // if it is, merge both of them in a larger item, with its center at
    // the weighed center of the merged items.

    if (l) {
        for (let i=1; i<l; ) {
            const prevStart  = groups[i-1][0];
            const prevLength = groups[i-1][1];
            const prevEnd    = prevStart + prevLength;
            const currStart  = groups[i  ][0];
            const currLength = groups[i  ][1];

            if (prevEnd > currStart) {
                const prevItems  = groups[i-1][2];
                const currItems  = groups[i  ][2];
                const prevWeight = prevItems.length;
                const currWeight = currItems.length;
                const prevCenter = prevStart + (prevLength / 2);
                const currCenter = currStart + (currLength / 2);
                const mergedLength = prevLength + currLength;
                const mergedCenter = ((prevCenter * prevWeight) + (currCenter * currWeight)) / (prevWeight + currWeight);
                let mergedStart = mergedCenter - (mergedLength / 2);
                mergedStart = Math.max(min, mergedStart);
                mergedStart = Math.min(max - mergedLength, mergedStart);

                const merged = [ mergedStart, mergedLength, prevItems.concat(currItems) ];

                groups.splice(i-1, 2, merged);
                l--;

                // Merging groups means that the just merged group *might* start
                // before, so we have to roll back one item

                if (i>1) { i--; }
            } else {
                i++;
            }
        }
    }

    // Final pass: split the groups back into (now adjacent) segments, and
    // keep the original order
    for (let i=0; i<l; i++) {
        const m = groups[i][2].length;
        let groupStart = groups[i][0];
        for (let j=0; j<m; j+=2) {
            const segmentLength = groups[i][2][j];
            const segmentIndex  = groups[i][2][j+1];
            outSegments[segmentIndex] = ([groupStart, segmentLength]);
            groupStart += segmentLength;
        }
    }

    return outSegments;
}





