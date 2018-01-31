/**
 * @internal
 * Returns a count of iteration several nested loops would take
 * without actually running these loops.
 * @param max upper bound of the outermost loop
 * @param depth amount of nested loops
 * @return number of iterations
 * @example _fastForward(42, 3) is identical to three nested for's:
 * for (let i = 0; i <= 42; i++)
 *   for (let j = 0; j <= i; j++)
 *     for (let k = 0; k <= i; k++)
 *       count++;
 */
function _fastForward(max: number, depth: number): number {
	let val = 1;
	for (let i = 1; i <= depth; i++) {
		val = val * (max + i) / i;
	}
	return val;
}

/**
 * Encodes (packs) several integers into a single integer.
 * The order of integers in tha array is lost on encoding.
 * This implementation implies no limitations regarding
 * the size of that integers, it can be Int8, Int13 or whatever.
 * Just remember: the resulting number should not exceed Number.MAX_SAFE_INTEGER
 * @param integers array of integer values
 * @return packed integer
 * @example encode([1,2,3]); // 14
 */
export function encode(integers: number[]): number {
	integers = integers.slice().sort((a: number, b: number) => b - a);
	const MAX_DEPTH = integers.length - 1;
	let packed = 0;

	// Determine the position of the array in a lookup table
	// without constucting the LUT itself.
	for (let depth = 0; depth <= MAX_DEPTH; depth++) {
		// At each level, add the amount of items sub-LUT would take
		for (let i = 0; i < integers[depth]; i++) {
			packed += _fastForward(i, MAX_DEPTH - depth);
		}
	}

	// That's it.
	// The encoded value is just an index in a "pseudo" LUT
	return packed;
}

/**
 * Decodes (unpacks) single integers into an array of ints.
 * Once the order is lost on encoding, the resulting array is sorted.
 * You have to explicitly specify the count of of ints you expect.
 * Setting the wrong length would give incorrect results.
 * @param packed packed interger to decode
 * @param length expected array length
 * @return decoded array of integers
 * @example decode(14, 3); // [3,2,1]
 * @example decode(14, 1); // [14]
 */
export function decode(packed: number, length: number): number[] {
	const integers: number[] = new Array(length);
	const MAX_DEPTH = integers.length - 1;

	// Reverse process: At each depth (for each sub-LUT)...
	for (let depth = 0; depth <= MAX_DEPTH; depth++) {
		// ...try to fast forward until overshoot.
		for (let i = 0; /* unbounded */; i++) {
			integers[depth] = i;
			const ff = _fastForward(i, MAX_DEPTH - depth);
			if (ff > packed) {
				break;
			}
			packed -= ff;
		}
	}

	return integers;
}