import assert from "node:assert";
import { describe, it } from "node:test";
import { distance } from "./number.js";

describe(import.meta.filename, () => {
  describe(distance.name, () => {
    const tests: [a: number, b: number, expected: number][] = [
      [3, 1, 2],
      [2, 7, 5],
    ];

    for (const [a, b, expected] of tests) {
      it(`should return distance ${expected} for ${a} and ${b}`, () => {
        const result = distance(a, b);

        assert.strictEqual(result, expected);
      });
    }
  })
});
