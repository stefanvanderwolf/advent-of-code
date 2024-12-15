import assert from "node:assert";
import { readFile } from "node:fs/promises";
import { describe, it } from "node:test";
import { solve } from "../p1.js";
import path from "node:path";

describe("p1", () => {
  it("input", async () => {
    const filename = path.join(import.meta.dirname, "../assets/input.txt").replace("/dist/", "/");
    const input = await readFile(filename, "utf8");

    assert.strictEqual(solve(input), 230900224);
  });
});
