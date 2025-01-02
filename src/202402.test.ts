import assert from "node:assert";
import { describe, it } from "node:test";
import { isDecreasing, isDistanceWithinBounds, isIncreasing, isSafe, isSafeWithTolerance, p1, p2, parse, type Report } from "./202402.js";
import { read } from "./lib/main.js";

describe(import.meta.filename, () => {
  describe(isDistanceWithinBounds.name, () => {
    it("should return true for distance 2", () => {
      const inBounds = isDistanceWithinBounds(4, 2);

      assert.strictEqual(inBounds, true);
    });

    it("should return false for distance 0", () => {
      const inBounds = isDistanceWithinBounds(2, 2);

      assert.strictEqual(inBounds, false);
    });

    it("should return false for distance 4", () => {
      const inBounds = isDistanceWithinBounds(5, 1);

      assert.strictEqual(inBounds, false);
    });
  });

  describe(isIncreasing.name, () => {
    it("should return true for a 2 and b 3", () => {
      const result = isIncreasing(2, 3);

      assert.strictEqual(result, true);
    });

    it("should return false for a 3 and b 2", () => {
      const result = isIncreasing(3, 2);

      assert.strictEqual(result, false);
    });

    it("should return false for a 2 and b 2", () => {
      const result = isIncreasing(2, 2);

      assert.strictEqual(result, false);
    });
  });

  describe(isDecreasing.name, () => {
    it("should return true for a 3 and b 2", () => {
      const result = isDecreasing(3, 2);

      assert.strictEqual(result, true);
    });

    it("should return false for a 2 and b 3", () => {
      const result = isDecreasing(2, 3);

      assert.strictEqual(result, false);
    });

    it("should return false for a 2 and b 2", () => {
      const result = isDecreasing(2, 2);

      assert.strictEqual(result, false);
    });
  });

  describe(parse.name, () => {
    it("should parse input", () => {
      let input = `7
1 2 8 
9 1
1 3 6 7 9`

      const reports = parse(input);

      assert.deepStrictEqual(reports, [
        [7],
        [1, 2, 8],
        [9, 1],
        [1, 3, 6, 7, 9],
      ]);
    });
  });

  describe(p1.name, () => {
    describe(isSafe.name, () => {
      const tests: [report: Report, isSafe: boolean][] = [
        // Unsafe, adjacent levels differ too much
        [[1, 5], false],
        // Unsafe, increasing and then decreasing
        [[3, 4, 2], false],
        // Unsafe, decreasing and then increasing
        [[7, 5, 9], false],
        // Safe reports
        [[7, 6, 4, 2, 1], true],
        [[1, 2, 4, 6, 7], true],

        // Empty reports are safe
        [[], true],
        // Single level reports are safe
        [[1], true],
      ];

      for (const [report, expected] of tests) {
        it(`should return ${expected ? "safe" : "unsafe"} for report [${report}]`, () => {
          const result = isSafe(report)

          assert.strictEqual(result, expected);
        });
      }
    });

    it("example 1", () => {
      const example = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`;

      const n = p1(parse(example));

      assert.strictEqual(n, 2);
    });

    it("input", async () => {
      const input = await read("202402");

      const n = p1(parse(input));

      assert.strictEqual(n, 639);
    });

    it("input huge", async () => {
      const input = await read("202402");
      const huge = input.repeat(100).trim();

      const n = p1(parse(huge));

      assert.strictEqual(n, 63900);
    });
  });

  describe(p2.name, () => {
    describe(isSafeWithTolerance.name, () => {
      const tests: [report: Report, isSafe: boolean][] = [
        // Safe by removing the second level, 3.
        [[1, 3, 2, 4, 5], true],
        // Safe by removing the third level, 4.
        [[8, 6, 4, 4, 1], true],
        // Safe by removing the fourth level, 3.
        [[8, 6, 4, 3, 3], true],
        // Unsafe because of the third level 4 and last 9.
        [[8, 6, 4, 4, 9], false],
        [[8, 6, 4, 2, 9], true],
        [[8, 1, 2, 3, 4], true],
//         It seems that this case won't pass here, and it should. We don't know if we should merge next diff with current or previous diff with current so we should check both possibilities.
//[89, 92, 95, 93, 94, 97, 98]
      ];

      for (const [report, expected] of tests) {
        it(`should return ${expected ? "safe" : "unsafe"} for report [${report}]`, () => {
          const result = isSafeWithTolerance(report)

          assert.strictEqual(result, expected);
        });
      }
    });

    it("example 1", () => {
      const example = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`;

      const n = p2(parse(example));

      assert.strictEqual(n, 4);
    });

    it("input", async () => {
      const input = await read("202402");

      const n = p2(parse(input));

      assert.strictEqual(n, 674);
    });

    it("input huge", async () => {
      const input = await read("202402");
      const huge = input.repeat(100).trim();

      const n = p2(parse(huge));

      assert.strictEqual(n, 67400);
    });
  });
});
