import { Vec2 } from "../../lib/vec2.js";

class Robot {
  constructor(public position: Vec2, public readonly velocity: Vec2) { }
}

function wrap(value: number, min: number, max: number): number {
  const range = max - min + 1; // Calculate the range
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
    return new Robot(new Vec2(d[0]!, d[1]!), new Vec2(d[2]!, d[3]!))
  });
}

function dump(width: number, height: number, robots: Robot[]) {
  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const v = new Vec2(col, row);

      let r = 0;
      for (const robot of robots) {
        if (robot.position.equals(v)) {
          r += 1;
        }
      }

      if (r > 0)
        process.stdout.write(r.toString())
      else
        process.stdout.write(".")
    }
    console.log("")
  }
}

export const solve = (input: string) => {
  const robots = parse(input);
  const width = 101;
  const height = 103;

  let i = 0;
  sim: while (true) {
    i += 1
    sim(robots, width, height);

    // I have no clue how to find a christmas tree, which I do not know how it
    // is displayed... I played around with clustering or this one below which
    // is probably just luck. Probably someone smart has solved this better,
    // but will check it out later.
    let s = new Set();
    for (const robot of robots) {
      if (s.has(robot.position.toString())) {
        continue sim;
      }
      s.add(robot.position.toString());
    }

    dump(width, height, robots)
    return i;
  }
}
