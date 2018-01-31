export function encodeNaive(bytes: number[]): number {
	bytes = bytes.slice().sort((a: number, b: number) => b - a);
	console.log(bytes);
	let packed = 0;
	for (let i0 = 0; i0 <= 255; i0++) {
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

function _fastForward(max: number, depth: number): number {
	let val = 1;
	for (let i = 1; i <= depth; i++) {
		val = val * (max + i) / i;
	}
	return val;
}

export function encode(bytes: number[]): number {
	bytes = bytes.slice().sort((a: number, b: number) => b - a);
	const MAX_DEPTH = bytes.length - 1;
	let packed = 0;

	for (let depth = 0; depth <= MAX_DEPTH; depth++) {
		for (let i = 0; i < bytes[depth]; i++) {
			packed += _fastForward(i, MAX_DEPTH - depth);
		}
	}

	return packed;
}

export function decode(packed: number, length: number): number[] {
	const bytes: number[] = new Array(length);
	const MAX_DEPTH = bytes.length - 1;

	for (let depth = 0; depth <= MAX_DEPTH; depth++) {
		for (let i = 0; ; i++) {
			bytes[depth] = i;
			const ff = _fastForward(i, MAX_DEPTH - depth);
			if (ff > packed) {
				break;
			}
			packed -= ff;
		}
	}

	return bytes;
}