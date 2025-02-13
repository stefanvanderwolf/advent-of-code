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
    let visited = new Set<string>(source.toString());

    while (queue.length > 0) {
      let { dist, vec } = queue.shift()!;

      if (vec.equals(destination)) {
        return dist;
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

        if (newValue - value === 1 && !visited.has(neighbour.toString())) {
          visited.add(neighbour.toString())
          queue.push({
            vec: neighbour,
            dist: dist + 1,
          })
        }
      }
    }

    return null;
  }

export const solve = (input: string) => {
  const matrix = Matrix.from(input, parseInt)
  const trailheads = matrix.find(0)
  const destinations = matrix.find(9)

  let n = 0;
  for (const trailhead of trailheads) {
    for (const destination of destinations) {
      if (bfs(matrix, trailhead, destination)) {
        n += 1;
      }
    }
  }

  return n;
}
