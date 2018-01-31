import { encodeNaive, encode, decode } from '.';

console.log('Encode naively:', encodeNaive([2, 2, 4, 1, 1]));
console.log('Encode:', encode([2, 2, 4, 1, 1]));

const sourceArr = [ 0, 1, 2, 127, 128, 253, 254, 255 ];
console.log('Source array:', sourceArr)
const encoded = encode(sourceArr);
console.log('Encoded:', encoded);
console.log('Decoded:', decode(encoded, sourceArr.length));
