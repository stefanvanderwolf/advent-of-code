import readline from "node:readline";

import * as decode from "./lib/decode.ts";
import { main } from "./lib/main.ts";

const directions = ["L", "R"] as const;
type Direction = (typeof directions)[number];
type Turn = { direction: Direction; steps: number };

class Dial {
        public static size = 100;

        public position = 50;
        public rotations = 0;

        public turn(direction: Direction, steps: number) {
                this.rotations += Math.floor(steps / 100);

                const remainder = steps % 100;

                switch (direction) {
                        case "L": {
                                if (this.position !== 0 && this.position - remainder <= 0)
                                        this.rotations++;

                                this.position = (this.position + Dial.size - remainder) % Dial.size;

                                break;
                        }
                        case "R": {
                                if (this.position + remainder >= Dial.size)
                                        this.rotations++;

                                this.position = (this.position + Dial.size + remainder) % Dial.size;

                                break;
                        }
                }
        }
}

export async function parse(): Promise<Turn[]> {
        const rl = readline.createInterface({
                input: process.stdin,
        });

        const turns: Turn[] = [];
        for await (const line of rl) {
                const direction = decode.union(line.at(0), directions);
                const steps = decode.int(line.slice(1));
                turns.push({ direction, steps })
        }
        return turns;
}

export function part1(turns: readonly Turn[]) {
        let n = 0;
        const dial = new Dial();

        for (const turn of turns) {
                dial.turn(turn.direction, turn.steps);

                if (dial.position === 0)
                        n += 1;
        }

        return n;
}

export function part2(turns: readonly Turn[]) {
        let dial = new Dial();
        for (const turn of turns) {
                dial.turn(turn.direction, turn.steps);
        }

        return dial.rotations;
}

await main(import.meta, parse, part1, part2);
