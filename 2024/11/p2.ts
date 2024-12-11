function blink(stones: Map<number, number>) {
  const m = new Map<number, number>();
  for (const [n, times] of stones.entries()) {
    if (n === 0) {
      const k = m.get(1) ?? 0;
      m.set(1, k + times)
    } else if (n.toString().length % 2 == 0) {
      const s = n.toString();
      const length = s.length / 2;
      const left = parseInt(s.substring(0, length))
      const right = parseInt(s.substring(length, length + length))

      m.set(left, (m.get(left) ?? 0) + times)
      m.set(right,(m.get(right) ?? 0) + times)
    } else {
      m.set(n * 2024, (m.get(n * 2024) ?? 0) + times)
    }
  }
  return m
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
  const amount = 75;
  for (let i = 0; i < amount; i++) {
    blinked = blink(blinked);
  }
  let n = 0;
  for (const [_, times] of blinked.entries()) {
    n += times;
  }
  return n;
}
