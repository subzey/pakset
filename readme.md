# pakset

A proof-of concept implementation that packs a set of integers into one integer.

## How to run

```sh
npm install
npm test
```

## What happens?

On packing we keep the values but lose the information about the order.

`[1, 2, 3, 2]` becomes `[3, 2, 2, 1]` - all the values are here, but the order is lost.

The good thing is that if we sacrifice the order of N elements, we get approx log2(N!)
bits at our disposal.

## What exactly happens?

Imagine a lookup table that contains all the possible combinations of 2 bit values (unsorted):

```
0: [0, 0]
1: [1, 0]
2: [1, 1]
3: [2, 0]
4: [2, 1]
5: [2, 2]
6: [3, 0]
7: [3, 1]
8: [3, 2]
9: [3, 3]
```

Storing two 2 bit values would require 2 * 2 = 4 bits. But to store an index in that table (one of the total 10) you'll need just log2(10) = 3.32 bits. Profit!

The more is the scale, the more bits are saved.

_Imagine the extreme case: If you need to store 255 1-bit flags while keeping order, you'll need 255 bits. But if the order is not important, you can just specify the amount of flags set to 1. That's a regular number 0..255, and would require just a good old 8-bit byte._

## Uhh... TypeScript?

Fear not, it's friendly.