import readline from "node:readline";

import { main } from "./lib/main.ts";
import { VecSet } from "./lib/set.ts";

export class GridSet extends VecSet {
        public static readonly directions = [
                [-1, -1], [-1, 0], [-1, 1],
                [0, -1],           [0, 1],
                [1, -1],  [1, 0],  [1, 1]
        ] as const;

        public isAccessible(row: number, col: number): boolean {
                let surrounded = 0;
                for (const direction of GridSet.directions) {
                        if (this.has(row + direction[0], col + direction[1]))
                                surrounded++;

                        if (surrounded >= 4)
                                return false;
                }

                return true;
        }
}

export async function parse(): Promise<GridSet> {
        const lines = await Array.fromAsync(
                readline.createInterface({
                        input: process.stdin,
                })
        );

        const grid = new GridSet();
        for (const [row, line] of lines.entries()) {
                for (const [col, ch] of Array.from(line).entries()) {
                        if (ch === "@")
                                grid.add(row, col);
                }
        }

        return grid;
}


export function part1(grid: GridSet) {
        let n = 0;
        for (const [row, col] of grid)
                if (grid.isAccessible(row, col))
                        n++;

        return n;
}

export function part2(grid: GridSet) {
        let n = 0;

        while (true) {
                const deletes: [number, number][] = [];
                for (const [row, col] of grid) {
                        if (grid.isAccessible(row, col))
                                deletes.push([row, col]);
                }

                n += deletes.length;

                if (deletes.length === 0)
                        break;

                for (const [row, col] of deletes)
                        grid.delete(row, col);
        }

        return n;
}

await main(import.meta, parse, part1, part2);
