import readline from "node:readline";

import * as decode from "./lib/decode.ts";
import { main } from "./lib/main.ts";

const joltages  = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;
type Joltage = typeof joltages[number];

class Bank extends Array<Joltage> {
        public static decode(line: string): Bank {
                const bank = new this();
                for (const ch of line)
                        bank.push(decode.union(decode.int(ch), joltages));

                return bank;
        }

        public maxJoltage(size: number = 2): number {
                let max = new Bank(...this.slice(-size));

                for (const current of this.reverse().slice(size)) {
                        let previous = current;

                        for (const [i, jolt] of max.entries()) {
                                if (previous < jolt)
                                        break;

                                max[i] = previous
                                previous = jolt;
                        }
                }

                return max.joltage;
        }

        public get joltage(): number {
                let n = 0;
                for (const jolt of this) {
                        n *= 10;
                        n += jolt;
                }
                return n;
        }
}

export async function parse(): Promise<Bank[]> {
        const rl = readline.createInterface({
                input: process.stdin,
        });

        let banks: Bank[] = [];
        for await (const line of rl) {
                banks.push(Bank.decode(line));
        }

        return banks;
}

export function part1(banks: readonly Bank[]) {
        let n = 0;
        for (const bank of banks) {
                n += bank.maxJoltage();
        }

        return n;
}

export function part2(banks: readonly Bank[]) {
        let n = 0;
        for (const bank of banks) {
                n += bank.maxJoltage(12);
        }

        return n;
}

await main(import.meta, parse, part1, part2);
