import assert from "node:assert";

export function int2(str: string, delimeter: string = ","): [number, number] {
        const results = ints(str, delimeter);

        const [a, b] = results;

        assert(
                a !== undefined && b !== undefined,
                `Invalid number of integers: expected 2, got ${results.length}`
        )

        return [a, b];
}

export function ints(str: string, delimeter: string = ","): number[] {
        return str
                .split(delimeter)
                .map((part) => int(part));
}

export function int(str: string): number {
        const int = parseInt(str, 10);

        assert(!isNaN(int), `Invalid integer: ${str}`);

        return int;
}


export function union<
T extends readonly (string | number)[]
>(
        value: string | number | undefined,
        options: T
): T[number] {
        assert(
                value !== undefined && options.includes(value),
                `Invalid union value: ${value}, expected one of: ${options.join(", ")}`
        )

        return value;
}
