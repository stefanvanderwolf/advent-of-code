import assert from "node:assert";
import { readFile } from "node:fs/promises";
import { describe, it } from "node:test";
import { solve } from "../p2.js";
import path from "node:path";

describe("p2", () => {
  it("example 1", () => {
    const example = `.....0.
..4321.
..5..2.
..6543.
..7..4.
..8765.
..9....`;

    assert.strictEqual(solve(example), 3);
  });

  it("example 2", () => {
    const example = `..90..9
...1.98
...2..7
6543456
765.987
876....
987....`;

    assert.strictEqual(solve(example), 13);
  });

  it("example 3", () => {
    const example = `012345
123456
234567
345678
4.6789
56789.`;

    assert.strictEqual(solve(example), 227);
  });

  it("example 4", () => {
    const example = `89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`;

    assert.strictEqual(solve(example), 81);
  });

  it("input", async () => {
    const filename = path.join(import.meta.dirname, "../assets/input.txt").replace("/dist/", "/");
    const input = await readFile(filename, "utf8");

    assert.strictEqual(solve(input), 1326);
  });
});
