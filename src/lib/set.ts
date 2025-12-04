import assert from "node:assert";

export class VecSet {
        private buffer: Set<number>;

        public constructor() {
                this.buffer = new Set<number>();
        }

        public add(row: number, col: number) {
                this.buffer.add(this.pack(row, col));
        }

        public delete(row: number, col: number) {
                this.buffer.delete(this.pack(row, col));
        }

        public has(row: number, col: number): boolean {
                return this.buffer.has(this.pack(row, col));
        }

        public *[Symbol.iterator](): IterableIterator<[number, number]> {
                for (const n of this.buffer)
                        yield this.unpack(n);
        }

        private pack(a: number, b: number): number {
                assert(a < 256 && b < 256);

                return (a << 8) | b;
        }

        private unpack(x: number): [number, number] {
                return [(x >> 8) & 0xFF, x & 0xFF];
        }
}
