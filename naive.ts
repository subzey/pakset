/**
 * A naive reference implementation with hard-coded depth of 5
 */
export function encodeNaive(bytes: number[]): number {
	bytes = bytes.slice().sort((a: number, b: number) => b - a);
	let packed = 0;
	for (let i0 = 0; /* unbounded */; i0++) {
		for (let i1 = 0; i1 <= i0; i1++) {
			for (let i2 = 0; i2 <= i1; i2++) {
				for (let i3 = 0; i3 <= i2; i3++) {
					for (let i4 = 0; i4 <= i3; i4++) {

						if (
							bytes[0] === i0 &&
							bytes[1] === i1 &&
							bytes[2] === i2 &&
							bytes[3] === i3 &&
							bytes[4] === i4
						) {
							return packed;
						}
						packed++;
					}
				}
			}
		}
	}
	/* never */
};