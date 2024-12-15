import assert from "node:assert";
import { readFile } from "node:fs/promises";
import { describe, it } from "node:test";
import { solve } from "../p1.js";
import path from "node:path";

describe("p1", () => {
  it("example 1", () => {
const example = `AAAA
BBCD
BBCC
EEEC`;

    assert.strictEqual(solve(example), 140);
  });

  it("example 2", () => {
const example = `OOOOO
OXOXO
OOOOO
OXOXO
OOOOO`;

    assert.strictEqual(solve(example), 772);
  });

  it("example 3", () => {
const example = `RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE`;

    assert.strictEqual(solve(example), 1930);
  });

  it("input", async () => {
    const filename = path.join(import.meta.dirname, "../assets/input.txt").replace("/dist/", "/");
    const input = await readFile(filename, "utf8");

    assert.strictEqual(solve(input), 1457298);
  });
});
