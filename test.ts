import { encode, decode } from '.';
import { encodeNaive } from './naive';

console.log('Encode naively:', encodeNaive([1, 2, 3, 4, 5]));
console.log('Encode:', encode([1, 2, 3, 4, 5]));

const sourceArr = [ 0, 1, 2, 127, 128, 253, 254, 255 ];
console.log('Source array:', sourceArr)
const encoded = encode(sourceArr);
console.log('Encoded:', encoded);
console.log('Decoded:', decode(encoded, sourceArr.length));
