import { Matrix } from "../../lib/collection/matrix/matrix.js";
import { Vec2 } from "../../lib/vec2.js";

function bfs(matrix: Matrix<string>, source: Vec2, destination: Vec2) {
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

    const _value = matrix.get(vec);
    if (!_value) {
      continue;
    }
    const value = parseInt(_value)


    for (let dir of directions) {
      let newX = vec.x + dir.x;
      let newY = vec.y + dir.y;
      let newVec = new Vec2(newX, newY)

      const _newValue = matrix.get(newVec);
      if (!_newValue) {
        continue;
      }
      const newValue = parseInt(_newValue);

      const delta = newValue - value;

      if (delta === 1) {
        queue.push({
          vec: newVec,
          dist: dist + 1,
        })
      }
    }
  }

  return n;
}

export const solve = (input: string) => {
  const matrix = Matrix.from(input)
  const trailheads = matrix.find("0")
  const destinations = matrix.find("9")

  let n = 0;
  for (const trailhead of trailheads) {
    for (const destination of destinations) {
      n += bfs(matrix, trailhead, destination)
    }
  }

  return n;
}
