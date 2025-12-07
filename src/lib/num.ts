export function sum(nums: number[]): number {
        return nums.reduce((a, acc) => {
                return a + acc;
        }, 0);
}

export function product(nums: number[]): number {
        if (nums.length === 0) return 0;

        return nums.reduce((a, acc) => {
                return a * acc;
        }, 1);
}
