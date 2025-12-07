import readline from "node:readline";

import { main } from "./lib/main.ts";
import { VecSet } from "./lib/set.ts";

type Input = {
        tachyon: [row: number, col: number],
        splitters: VecSet
        height: number;
};

export async function parse(): Promise<Input> {
        const lines = await Array.fromAsync(
                readline.createInterface({
                        input: process.stdin,
                }),
        );

        let start: [row: number, col: number] = [0, 0];
        let vecs = new VecSet();
        let height = 0;
        for (const [row, line] of lines.entries()) {
                for (const [col, ch] of Array.from(line).entries()) {
                        if (ch === "S")
                                start = [row, col];
                        else if (ch === "^") {
                                vecs.add(row, col);
                                height = Math.max(height, row);
                        }
                }
        }

        return {
                tachyon: start,
                splitters: vecs,
                height,
        };
}

export function part1(input: Input) {
        let n = 0;

        let beams = new VecSet();
        beams.add(input.tachyon[0], input.tachyon[1]);

        for (let i = 0; i < input.height; i++) {
                const next = new VecSet();

                for (const beam of beams) {
                        const [row, col] = beam;

                        if (input.splitters.has(row + 1, col)) {
                                next.add(row + 1, col - 1);
                                next.add(row + 1, col + 1);
                                n += 1;
                        } else {
                               next.add(row + 1, col);
                        }
                }
                beams = next;
        }

        return n;
}

export function part2(input: Input) {
        const cache: Map<string, number> = new Map();

        function timeline(beam: [number, number]): number {
                const [row, col] = beam;
                const key = row + "," + col;

                const cached = cache.get(key);
                if (cached !== undefined)
                        return cached

                let result = 0;
                if (input.splitters.has(row + 1, col))
                        result = timeline([row + 1, col - 1]) + timeline([row + 1, col + 1])
                else if (row < input.height)
                        result = timeline([row + 1, col]);
                else
                        result = 1;

                cache.set(key, result);

                return result;
        }

        return timeline(input.tachyon);
}

await main(import.meta, parse, part1, part2);
