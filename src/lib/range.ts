import assert from "node:assert";

export default class Range {
        public readonly lowerbound: number;
        public readonly upperbound: number;

        public constructor([lowerbound, upperbound]: [number, number]) {
                assert(
                        lowerbound <= upperbound,
                                `Lowerbound ${lowerbound} must be less than or equal to upperbound ${upperbound}`
                );

                this.lowerbound = lowerbound;
                this.upperbound = upperbound;
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
