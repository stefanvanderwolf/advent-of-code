import assert from "node:assert";
import { readFile } from "node:fs/promises";
import { describe, it } from "node:test";
import { solve } from "../p1.js";
import path from "node:path";

describe("p1", () => {
  it("example 1", () => {
    const example = `Button A: X+94, Y+34
Button B: X+22, Y+67
Prize: X=8400, Y=5400`

    assert.strictEqual(solve(example), 480);
  });

  it("input", async () => {
    const filename = path.join(import.meta.dirname, "../assets/input.txt").replace("/dist/", "/");
    const input = await readFile(filename, "utf8");

    assert.strictEqual(solve(input), 28753);
  });
});