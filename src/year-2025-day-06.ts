import readline from "node:readline";

import * as decode from "./lib/decode.ts";
import { main } from "./lib/main.ts";
import assert from "node:assert";
import { product, sum } from "./lib/num.ts";

const operators = ["+", "*"] as const;
type Operator = (typeof operators)[number];
type Input = {
        operators: Operator[];
        columns: string[][];
};

export async function parse(): Promise<Input> {
        const lines = await Array.fromAsync(
                readline.createInterface({
                        input: process.stdin,
                }),
        );

        let max = Math.max(...lines.map((line) => line.length));

        let columns: string[][] = [];
        let column: string[] = new Array(lines.length - 1);
        for (let i = 0; i < max; i++) {
                const isDelimiter = lines.slice(0, -1).every((line) => {
                        const ch = line[i];
                        return ch === undefined || ch === " ";
                });

                if (isDelimiter) {
                        columns.push(column);
                        column = new Array(lines.length - 1);
                } else {
                        for (const [j, line] of lines.slice(0, -1).entries()) {
                                const ch = line[i];

                                if (ch !== undefined) {
                                        column[j] ||= "";
                                        column[j] += ch;
                                }
                        }
                }
        }

        columns.push(column);

        return {
                operators: lines
                        .at(-1)!
                        .split(/\s+/)
                        .map((op) => decode.union(op.trim(), operators)),
                columns,
        };
}

export function part1(input: Input) {
        let n = 0;
        for (const [i, operator] of input.operators.entries())
                n += exec(
                        input.columns[i]!.map((s) => decode.int(s.trim())),
                        operator,
                );
        return n;
}

export function part2(input: Input) {
        let n = 0;

        for (const [i, operator] of input.operators.entries()) {
                const column = input.columns[i]!;
                const max = Math.max(...column.map((s) => s.length));

                let nums: number[] = [];
                for (let d = 0; d < max; d++) {
                        let r = "";

                        for (let j = 0; j < column.length; j++) {
                                const ch = column[j]![d];
                                if (ch === undefined || ch === " ") continue;

                                r += ch;
                        }

                        if (r !== "") nums.push(decode.int(r));
                }

                n += exec(nums, operator);
        }

        return n;
}

function exec(nums: number[], operator: Operator): number {
        switch (operator) {
                case "+":
                        return sum(nums);
                case "*":
                        return product(nums);
        }
}

await main(import.meta, parse, part1, part2);
