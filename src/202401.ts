import { Main } from "./lib/main.js";
import assert from "node:assert";
import { EOL } from "os";
import { distance } from "./lib/number.js";

Main(parse, p1, p2, import.meta.url);

export type Locations = {
  left: number[];
  right: number[];
};

export function parse(input: string): Locations {
  const left: number[] = [];
  const right: number[] = [];

  const lines = input.trim().split(EOL);
  for (const line of lines) {
    const numbers = line.match(/\d+/g)?.map(Number); assert(numbers && numbers.length === 2);
    const a = numbers[0]; assert.ok(a);
    const b = numbers[1]; assert.ok(b);

    left.push(a);
    right.push(b);
  }

  assert.strictEqual(left.length, right.length);

  // Sort the locations. Both solutions depend on this.
  left.sort()
  right.sort()

  return { left, right };
}

/**
  * Solve for the total distance between all location ids
  *
  * Compare location ids from smallest to biggest. The `Locations` object is
  * expected to be sorted. With that given we can loop through both lists at
  * the same time and calculate distances between the location ids.
  *
  * @time O(n)
  * @space O(1)
  */
export function p1(locations: Locations): number {
  let n = 0;

  let i = 0;
  while (i < locations.left.length && i < locations.right.length) {
    n += distance(locations.left[i], locations.right[i]);
    i += 1;
  }

  return n;
};

/**
  * Solve the total similarities.
  *
  * Loop through both lists and count how many times the `left` location id is
  * found in the `right` location list.
  *
  * @time O(n + m)
  * @space O(1)
  */
export function p2(locations: Locations): number {
  let n = 0;

  let i = 0;
  let j = 0;
  let previous = 0;
  while (i < locations.left.length) {
    const location = locations.left[i];

    // The actual input doesn't have this, but the examples do. Here we check
    // if the location is the same as the previous. Since we use two pointers
    // in the list we already handled all matching values in the right list. So
    // when we are the same as the previous just add the previous value again
    // and continue to next value.
    //
    // @example: 
    // left: [3, 3, 5]
    // right: [3, 3, 6]
    //
    // After handling the first 3 the j pointer is at 6.
    if (location == locations.left[i - 1]) {
      i += 1;
      n += previous;
      continue;
    }

    // Lists are sorted, so if the location is greater than the current right
    // value, we can skip.
    while (location > locations.right[j]) {
      j += 1;
    }

    // Similarity is location * found instances in right list. Which is the
    // same as keep adding the location on matching locations.
    let simularity = 0;
    while (location === locations.right[j]) {
      simularity += location
      j += 1;
    }
    n += simularity;
    previous = simularity;

    i += 1;
  }

  return n;
};
