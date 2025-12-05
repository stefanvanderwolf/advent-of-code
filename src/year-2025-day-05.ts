import readline from "node:readline";

import * as decode from "./lib/decode.ts";
import Range from "./lib/range.ts";
import { main } from "./lib/main.ts";

type Database = {
        ranges: readonly Range[];
        ingredients: readonly number[];
};

export async function parse(): Promise<Database> {
        const rl = readline.createInterface({
                input: process.stdin,
        });

        const ranges: Range[] = []
        for await (const line of rl) {
                if (line.length === 0)
                        break;

                ranges.push(Range.fromString(line));
        }

        const ingredients: number[] = []
        for await (const line of rl)
                ingredients.push(decode.int(line));

        return {
                ranges: Range.merge(ranges),
                ingredients,
        };
}


export function part1(database: Database) {
        let n = 0;
        for (const ingredient of database.ingredients) {
                if (database.ranges.some(range => range.contains(ingredient)))
                        n++;
        }

        return n;
}

export function part2(database: Database) {
        let n = 0;
        for (const range of database.ranges)
                n += range.upperbound - range.lowerbound + 1
        return n;
}

await main(import.meta, parse, part1, part2);
