import assert from "node:assert";

import * as decode from "./decode.ts";

export default class Range {
        public lowerbound: number;
        public upperbound: number;

        public constructor([lowerbound, upperbound]: [number, number]) {
                assert(
                        lowerbound <= upperbound,
                                `Lowerbound ${lowerbound} must be less than or equal to upperbound ${upperbound}`
                );

                this.lowerbound = lowerbound;
                this.upperbound = upperbound;
        }

        public static fromString(str: string, delimeter: string = "-"): Range {
                return new Range(decode.int2(str, delimeter));
        }

        /**
         * Merges overlapping and adjacent ranges.
         */
        public static merge(ranges: readonly Range[]): Range[] {
                const sorted = ranges.toSorted(
                        (a, b) => a.lowerbound - b.lowerbound
                )

                let [current, ...rest] = sorted;
                if (current === undefined)
                        return [];

                const merged: Range[] = [];
                for (const next of rest) {
                        if (next.lowerbound <= current.upperbound + 1) {
                                // Merge overlapping/contiguous ranges
                                current.upperbound = Math.max(current.upperbound, next.upperbound);
                        } else {
                                merged.push(current);
                                current = next;
                        }
                }

                merged.push(current);

                return merged;
        }

        public contains(value: number): boolean {
                return this.lowerbound <= value && value <= this.upperbound;
        }

        [Symbol.iterator]() {
                const upperbound = this.upperbound;
                let current = this.lowerbound;

                return {
                        next(): IteratorResult<number> {
                                if (current <= upperbound) {
                                        return { done: false, value: current++ };
                                } else {
                                        return { done: true, value: null };
                                }
                        },
                };
        }
}
