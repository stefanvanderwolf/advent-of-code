import { Vec2 } from "../../lib/vec2.js";

type Robot = { position: Vec2, velocity: Vec2 };

function wrap(value: number, min: number, max: number): number {
  const range = max - min + 1;
  return ((value - min) % range + range) % range + min;
}

function sim(robots: Robot[], width: number, height: number) {
  for (const robot of robots) {
    const x = wrap(robot.position.x + robot.velocity.x, 0, width - 1)
    const y = wrap(robot.position.y + robot.velocity.y, 0, height - 1)

    robot.position = new Vec2(x, y)
  }
}

function parse(input: string): Robot[] {
  return input.trim().split("\n").map((line) => {
    const raw = line.trim().match(/-?\d+/g)!
    const d = raw.map(Number);
    return {position: new Vec2(d[0]!, d[1]!), velocity: new Vec2(d[2]!, d[3]!)}
  });
}

export const solve = (input: string) => {
  const robots = parse(input);
  const width = 101;
  const height = 103;
  for (let i = 0; i < 100; i++) {
    sim(robots, width, height);
  }

  const ignoreY = (height - 1) / 2
  const ignoreX = (width - 1) / 2

  const quadrants = [
    {a: new Vec2(0, 0), b: new Vec2(ignoreX - 1, ignoreY - 1)},
    {a: new Vec2(ignoreX + 1, 0), b: new Vec2(width - 1, ignoreY - 1)},
    {a: new Vec2(0, ignoreY + 1), b: new Vec2(ignoreX - 1, height - 1)},
    {a: new Vec2(ignoreX + 1, ignoreY + 1), b: new Vec2(width - 1, height - 1)},
  ]

  let n = 0;
  for (const quadrant of quadrants) {
    let j = 0;
    for (const robot of robots) {
      if (robot.position.x < quadrant.a.x) continue;
      if (robot.position.x > quadrant.b.x) continue;

      if (robot.position.y < quadrant.a.y) continue;
      if (robot.position.y > quadrant.b.y) continue;

        j += 1;
    }

    n = Math.max(n, 1) * j;
  }

  return n;
}
