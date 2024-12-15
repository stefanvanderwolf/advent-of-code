import { Matrix } from "../../lib/collection/matrix/matrix.js";
import { Vec2 } from "../../lib/vec2.js";

type Region = { region: string, plots: Vec2[] }

const directions = [
  new Vec2(-1, 0),
  new Vec2(1, 0),
  new Vec2(0, -1),
  new Vec2(0, 1),
];

function getRegions(garden: Matrix<string>): Region[] {
  let regions: Region[] = [];

  let visited = new Set<string>();
  for (let row = 0; row < garden.rows; row++) {
    for (let col = 0; col < garden.cols; col++) {
      let vec = new Vec2(col, row);
      if (visited.has(vec.toString())) {
        continue;
      }

      visited.add(vec.toString())

      let plot = garden.get(vec)!

      function explore(vec2: Vec2, region: string): Vec2[] {
        let plots: Vec2[] = [];
        for (const direction of directions) {
          const neighbour = vec2.add(direction);
          if (visited.has(neighbour.toString()) || garden.get(neighbour) !== region) {
            continue;
          }

          visited.add(neighbour.toString());

          plots.push(neighbour);
          plots = plots.concat(explore(neighbour, region))
        }

        return plots;
      }

      let region: Region = { region: plot, plots: [vec].concat(explore(vec, plot)) }
      regions.push(region)
    }
  }

  return regions;
}

function getPerimeter(garden: Matrix<string>, region: Region): number {
  let count = 0;
  for (const plot of region.plots) {
    for (const direction of directions) {
      let neighbour = plot.add(direction);
      let other = garden.get(neighbour)

      if (other === null || other !== region.region) {
        count += 1;
      }
    }
  }

  return count;
}

export const solve = (input: string) => {
  let n = 0;
  const matrix = Matrix.from(input, (s) => s);
  const regions = getRegions(matrix);
  for (const region of regions) {
    const perimeter = getPerimeter(matrix, region);
    const area = region.plots.length;
    n += perimeter * area;
  }

  return n;
}
