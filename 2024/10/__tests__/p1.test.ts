import assert from "node:assert";
import { readFile } from "node:fs/promises";
import { describe, it } from "node:test";
import { solve } from "../p1.js";
import path from "node:path";

describe("p1", () => {
  it("example 1", () => {
    const example = `0123
1234
8765
9876`;

    assert.strictEqual(solve(example), 1);
  });

  it("example 2", () => {
    const example = `...0...
...1...
...2...
6543456
7.....7
8.....8
9.....9`;

    assert.strictEqual(solve(example), 2);
  });

  it("example 2", () => {
    const example = `..90..9
...1.98
...2..7
6543456
765.987
876....
987....`;

    assert.strictEqual(solve(example), 4);
  });

  it("example 3", () => {
    const example = `10..9..
2...8..
3...7..
4567654
...8..3
...9..2
.....01`;

    assert.strictEqual(solve(example), 3);
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

    assert.strictEqual(solve(example), 36);
  });

  it("input", async () => {
    const filename = path.join(import.meta.dirname, "../assets/input.txt").replace("/dist/", "/");
    const input = await readFile(filename, "utf8");

    assert.strictEqual(solve(input), 709);
  });
});
