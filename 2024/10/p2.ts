import { Matrix } from "../../lib/collection/matrix/matrix.js";
import { Vec2 } from "../../lib/vec2.js";

function bfs(matrix: Matrix<number>, source: Vec2, destination: Vec2) {
  const directions = [
    { x: -1, y: 0 }, // up
    { x: 1, y: 0 },  // down
    { x: 0, y: -1 }, // left
    { x: 0, y: 1 },  // right
  ];

  let queue = [{ dist: 0, vec: source }];

  let n = 0;
  while (queue.length > 0) {
    let { dist, vec } = queue.shift()!;

    if (vec.equals(destination)) {
      n += 1;
      continue;
    }

    const value = matrix.get(vec);
    if (value === null) {
      continue;
    }

    for (let dir of directions) {
      let neighbour = new Vec2(vec.x + dir.x, vec.y + dir.y)

      const newValue = matrix.get(neighbour);
      if (newValue === null) {
        continue;
      }

      if (newValue - value === 1) {
        queue.push({
          vec: neighbour,
          dist: dist + 1,
        })
      }
    }
  }

  return n;
}

export const solve = (input: string) => {
  const matrix = Matrix.from(input, parseInt)
  const trailheads = matrix.find(0)
  const destinations = matrix.find(9)

  let n = 0;
  for (const trailhead of trailheads) {
    for (const destination of destinations) {
      n += bfs(matrix, trailhead, destination)
    }
  }

  return n;
}
