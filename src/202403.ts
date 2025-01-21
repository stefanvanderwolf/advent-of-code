import { Main } from "./lib/main.js";
import { EOL } from "os";

Main(parse, p1, p2, import.meta.url);

type Mul = { type: "mul", a: number, b: number };
type Do = { type: "do" };
type Dont = { type: "dont" };
type AnyInstruction = Mul | Do | Dont

export function parse(input: string): AnyInstruction[] {
  let instructions: AnyInstruction[] = [];
  const regex = /(mul)\((\d+),(\d+)\)|(do)\(\)|(don't)\(\)/g;
  const lines = input.trim().split(EOL);
  for (const line of lines) {
    let results: RegExpExecArray | null = null;
    while ((results = regex.exec(line)) !== null) {
      let instruction = results[1] || results[4] || results[5] || null;

      switch (instruction) {
        case "mul":
          instructions.push({ type: "mul", a: parseInt(results[2]), b: parseInt(results[3]) })
          break;
        case "do":
          instructions.push({ type: "do" })
          break;
        case "don't":
          instructions.push({ type: "dont" })
          break;
      }
    }
  }

  return instructions;
}

/**
  * Add all the multiplication instructions together.
  */
export function p1(instructions: AnyInstruction[]): number {
  let n = 0;
  for (const instruction of instructions) {
    if (instruction.type === "mul") {
      n += instruction.a * instruction.b;
    }
  }

  return n;
};


/**
  * Add all the multiplication instructions together if we are enabled.
  *
  * Enabled is turned on by default but will be changed when finding a do() or
  * don't() instruction.
  */
export function p2(instructions: AnyInstruction[]): number {
  let n = 0;
  let enabled = true;
  for (const instruction of instructions) {
    switch (instruction.type) {
      case "mul": {
        if (enabled) {
          n += instruction.a * instruction.b;
        }
        break;
      }
      case "do":
        enabled = true;
        break;
      case "dont":
        enabled = false;
        break;
    }
  }

  return n;
};

