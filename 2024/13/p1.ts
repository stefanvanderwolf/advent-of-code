import { Vec2 } from "../../lib/vec2.js";

type Game = {
  a: Vec2,
  b: Vec2,
  prize: Vec2,
};

function parse(input: string) {
  const games: Game[] = [];

  const groups = input.split("\n\n")
  for (const group of groups) {
    const lines = group.split("\n")
    const adigits = lines[0]!.match(/\d+/g)!;
    const bdigits = lines[1]!.match(/\d+/g)!;
    const pdigits = lines[2]!.match(/\d+/g)!;

    const a = new Vec2(parseInt(adigits[0]), parseInt(adigits[1]!));
    const b = new Vec2(parseInt(bdigits[0]), parseInt(bdigits[1]!));
    const prize = new Vec2(parseInt(pdigits[0]), parseInt(pdigits[1]!));

    games.push({ a, b, prize })
  }

  return games;
}

function minimum(
  game: Game,
): number | null {
  let min = Infinity;

  const maxX = Math.max(game.prize.x / game.a.x, game.prize.x / game.b.x);
  const maxY = Math.max(game.prize.y / game.a.y, game.prize.y / game.b.y);
  loop: for (let x = 0; x <= maxX; x++) {
    for (let y = 0; y <= maxY; y++) {
      const cost = 3 * x + y;
      if (cost > min) {
        continue loop;
      }

      const currentX = x * game.a.x + y * game.b.x;
      const currentY = x * game.a.y + y * game.b.y;

      if (currentX > game.prize.x && currentY > game.prize.y) {
        continue loop;
      }

      if (currentX === game.prize.x && currentY === game.prize.y) {
        min = cost
      }
    }
  }

  return min !== Infinity ? min : null;
}

export const solve = (input: string) => {
  let n = 0;
  const games = parse(input);
  for (const game of games) {
    n += minimum(game) ?? 0;
  }
  return n;
}
