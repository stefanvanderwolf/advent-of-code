import assert from "node:assert";
import { describe, it } from "node:test";
import { read } from "./lib/main.js";
import { p1, p2, parse } from "./202403.js";

describe(import.meta.filename, () => {
  describe(parse.name, () => {
    it("should parse input", () => {
      let input = `xmul(2,4)&mul[3,7]!^
don't()_mul(5,5)+mul(32,64](
mul(11,8)undo()?mul(8,5))`

      const instructions = parse(input);

      assert.deepStrictEqual(instructions, [
        { type: "mul", a: 2, b: 4 },
        { type: "dont" },
        { type: "mul", a: 5, b: 5 },
        { type: "mul", a: 11, b: 8 },
        { type: "do" },
        { type: "mul", a: 8, b: 5 },
      ]);
    });
  });

  describe(p1.name, () => {
    it("example 1", () => {
      const example = `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`;

      const n = p1(parse(example));

      assert.strictEqual(n, 161);
    });

    it("input", async () => {
      const input = await read("202403");

      const n = p1(parse(input));

      assert.strictEqual(n, 190604937);
    });
  });

  describe(p2.name, () => {
    it("example 2", () => {
      const example = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`;

      const n = p2(parse(example));

      assert.strictEqual(n, 48);
    });

    it("input", async () => {
      const input = await read("202403");

      const n = p2(parse(input));

      assert.strictEqual(n, 82857512);
    });
  });
});
