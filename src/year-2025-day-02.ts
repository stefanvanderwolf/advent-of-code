import readline from "node:readline";

import * as decode from "./lib/decode.ts";
import Range from "./lib/range.ts";
import { main } from "./lib/main.ts";

export async function parse(): Promise<Range[]> {
        const rl = readline.createInterface({
                input: process.stdin,
        });

        let ranges: Range[] = [];
        for await (const line of rl) {
                const range = line
                        .split(",")
                        .filter((str) => str.trim() !== "")
                        .map((str) =>
                                new Range(decode.int2(str, "-"))
                        )
                ranges = ranges.concat(range);
        }
        return ranges;
}

export function part1(ranges: readonly Range[]) {
        let n = 0;
        for (const range of ranges) {
                for (const i of range) {
                        if (isSplitSymmetric(i))
                                n += i;
                }
        }
        return n;
}

function isSplitSymmetric(n: number): boolean {
        const str = n.toString();
        const mid = str.length / 2;

        if (!Number.isInteger(mid))
                return false;

        for (let i = 0, j = mid; i < mid; i++, j++) {
                if (str[i] !== str[j])
                        return false;
        }

        return true;
}

export function part2(ranges: readonly Range[]) {
        let n = 0;
        for (const range of ranges) {
                for (const i of range) {
                        if (isRepeated(i))
                                n += i;
                }
        }
        return n;
}

function isRepeated(n: number, max = 2): boolean {
        const str = n.toString();
        const len = str.length;
        const mid = Math.floor(len / 2);

        // Loop backwards to find the largest possible repeated sequence first
        next: for (let i = mid; i != 0; i--) {
                // Unable to split evenly this sequence can never be repeated
                if (len % i !== 0)
                        continue;

                // Unable to fit the sequence at least twice
                if ((len / i) < 2)
                        continue;

                // Each pattern is always repeated at least once. Since each
                // slice of a string would contain itself
                let repeated = 1;

                // Compare each chunk, we can skip the first one as it's the
                // sub sequence
                for (let j = i; j < len; j += i) {
                        for (let k = 0; k < i; k++) {
                                if (str[k] !== str[j + k])
                                        continue next;
                        }

                        repeated++;
                }

                if (repeated >= max)
                        return true;
        }

        return false;
}

await main(import.meta, parse, part1, part2);
