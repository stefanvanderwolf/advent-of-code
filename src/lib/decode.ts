import assert from "node:assert";

export function int(s: string): number {
        const int = parseInt(s, 10);

        assert(!isNaN(int), `Invalid integer: ${s}`);

        return int;
}

export function union<
T extends readonly string[]
>(
        value: unknown,
        options: T
): T[number] {
        assert(
                typeof value === "string" && options.includes(value),
                `Invalid union value: ${value}, expected one of: ${options.join(", ")}`
        )

        return value;
}
