function blink(stones: Map<number, number>) {
  for (const [n, times] of stones.entries()) {
    if (n === 0) {
      stones.set(1, (stones.get(1) ?? 0) + times)
    } else if (n.toString().length % 2 == 0) {
      const s = n.toString();
      const length = s.length / 2;
      const left = parseInt(s.substring(0, length))
      const right = parseInt(s.substring(length, length + length))

      stones.set(left, (stones.get(left) ?? 0) + times)
      stones.set(right,(stones.get(right) ?? 0) + times)
    } else {
      stones.set(n * 2024, (stones.get(n * 2024) ?? 0) + times)
    }
  }
  return stones 
}

export const solve = (input: string) => {
  const numbers = input.split(" ").map((s) => {
    return parseInt(s)
  })
  let stones = new Map<number, number>();
  for (const number of numbers) {
    stones.set(number, 1);
  }

  let blinked = stones;
  const amount = 25;
  for (let i = 0; i < amount; i++) {
    blinked = blink(blinked);
  }
  let n = 0;
  for (const times of blinked.values()) {
    n += times;
  }
  return n;
}
