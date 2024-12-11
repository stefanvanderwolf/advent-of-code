import { Vec2 } from "../../vec2.js";

export class Matrix<Element> {
  cols: number = 0;
  rows: number = 0;

  private buffer: Element[][] = [];

  find(element: Element) {
    let elements: Vec2[] = [];
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        const current = this.buffer[row]![col]!

        if (current === element) {
          elements.push(new Vec2(col, row));
        }
      }
    }

    return elements;
  }

  get(vec: Vec2): Element | null {
    if (vec.y < 0 || vec.y >= this.rows) {
      return null;
    }

    if (vec.x < 0 || vec.x >= this.cols) {
      return null;
    }

    return this.buffer[vec.y]![vec.x]!;
  }

  toString(): string {
    const pad = (s: string): string => {
      return s.padStart(this.rows.toString().length - s.length)
    }

    let buffer = `${Matrix.name}(${this.cols}, ${this.rows}) {\n`;
    for (let row = 0; row < this.rows; row++) {
      buffer += `  ${pad((row + 1).toString())} `;
      for (let col = 0; col < this.cols; col++) {
        buffer += this.buffer[row]![col]!.toString()
      }
      if (row != this.rows - 1) {
        buffer += "\n";
      }
    }
    buffer += "\n}"

    return buffer;
  }

  static from(input: string): Matrix<string> {
    const matrix = new Matrix<string>();
    for (const [row, line] of input.split("\n").entries()) {
      // Prevent copy paste errors with empty lines at the end of the input.
      if (line.length === 0) {
        continue;
      }

      matrix.cols = line.length;
      matrix.rows = row + 1;

      const items = []
      for (const [_, character] of line.split("").entries()) {
        items.push(character)
      }
      matrix.buffer.push(items)
    }

    return matrix;
  }
}
