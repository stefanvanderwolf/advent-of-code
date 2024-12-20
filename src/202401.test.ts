import assert from "node:assert";
import { describe, it } from "node:test";
import { p1, p2, parse } from "./202401.js";
import { read } from "./lib/main.js";

describe(import.meta.filename, () => {
  describe(parse.name, () => {
    it("should parse input", () => {
      let input = `123   456
789   912
345   678`

      const locations = parse(input);

      assert.deepStrictEqual(locations.left, [123, 345, 789]);
      assert.deepStrictEqual(locations.right, [456, 678, 912]);
    });
  });

  describe(p1.name, () => {
    it("example 1", () => {
      const example = `3   4
4   3
2   5
1   3
3   9
3   3`;

      const n = p1(parse(example));

      assert.strictEqual(n, 11);
    });

    it("input", async () => {
      const input = await read("202401");

      const n = p1(parse(input));

      assert.strictEqual(n, 2264607);
    });

    it("input huge", async () => {
      const input = await read("202401");
      const huge = input.repeat(100).trim();

      const n = p1(parse(huge));

      assert.strictEqual(n, 226460700);
    });
  });

  describe(p2.name, () => {
    it("example 1", () => {
      const example = `3   4
4   3
2   5
1   3
3   9
3   3`;

      const n = p2(parse(example));

      assert.strictEqual(n, 31);
    });

    it("input", async () => {
      const input = await read("202401");

      const n = p2(parse(input));

      assert.strictEqual(n, 19457120);
    });

    it("input huge", async () => {
      const input = await read("202401");
      const huge = input.repeat(100).trim();

      const n = p2(parse(huge));

      assert.strictEqual(n, 194571200000);
    });
  })
});
