import readline from "node:readline";

import { main } from "./lib/main.ts";
import assert from "node:assert";

export async function parse(): Promise<Map<string, Set<string>>> {
	const rl = readline.createInterface({
		input: process.stdin,
	});

        const server = new Map<string, Set<string>>();

        for await (const line of rl) {
                const [name, rest] = line.split(": ");
                assert(name !== undefined && rest !== undefined, `Invalid line: ${line}`);

                const names = rest.split(" ");

                assert(!server.has(name));

                server.set(name, new Set(names));
        }

        return server;
}

export function part1(server: ReadonlyMap<string, ReadonlySet<string>>) {
        function dfs(name: string) {
                if (name === "out")
                        return 1;

                const neighbors = server.get(name);

                let n = 0;
                for (const neighbor of neighbors ?? []) {
                        n += dfs(neighbor);
                }

                return n;
        }

        return dfs("you");
}

export function part2(server: ReadonlyMap<string, ReadonlySet<string>>) {
        const cache = new Map<string, number>();

        function dfs(name: string, dac: boolean = false, fft: boolean = false): number {
                if (name === "out") {
                        return (dac && fft ? 1 : 0);
                }

                const key = `${name},${dac},${fft}`;
                const cached = cache.get(key);

                if (cached !== undefined)
                        return cached;

                dac ||= (name === "dac");
                fft ||= (name === "fft");

                const neighbors = server.get(name);

                let n = 0;
                for (const neighbor of neighbors ?? []) {
                        n += dfs(neighbor, dac, fft);
                }

                cache.set(key, n);

                return n;
        }

        return dfs("svr");
}

await main(import.meta, parse, part1, part2);
