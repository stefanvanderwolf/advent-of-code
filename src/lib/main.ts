import { performance } from "perf_hooks";

export async function main<Input, Output>(
        meta: ImportMeta,
        parse: () => Promise<Input> | Input,
        part1: (input: Input) => Output,
        part2: (input: Input) => Output
): Promise<void> {
        const now = performance.now();
        const input = await parse();
        const p1 = part1(input);
        const p2 = part2(input);
        const end = performance.now();
        process.stdout.write(`p1: ${p1}\n`);
        process.stdout.write(`p2: ${p2}\n`);
        process.stdout.write(`time: ${(end - now).toFixed(2)}ms\n`);
}
