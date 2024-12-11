import type { StringConvertible } from "./string-convertible.js";

export class Vec2 implements StringConvertible {
  constructor(public x: number, public y: number) {}

  equals(other: Vec2): boolean {
    return this.x == other.x && this.y == other.y;
  }

  add(other: Vec2): Vec2 {
    return new Vec2(this.x + other.x, this.y + other.y);
  }

  subtract(other: Vec2): Vec2 {
    return new Vec2(this.x - other.x, this.y - other.y);
  }

  toString(): string {
    return `${Vec2.name}(${this.x}, ${this.y})`;
  }
}
