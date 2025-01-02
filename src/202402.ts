import { Main } from "./lib/main.js";
import assert from "node:assert";
import { EOL } from "os";
import { distance } from "./lib/number.js";

Main(parse, p1, p2, import.meta.url);

export type Report = number[];

export function parse(input: string): Report[] {
  const reports: Report[] = [];

  const lines = input.trim().split(EOL);
  for (const line of lines) {
    const levels = line.match(/\d+/g)?.map(Number); assert(levels);

    reports.push(levels);
  }

  return reports;
}

/**
  * Find out how many `reports` are safe
  */
export function p1(reports: Report[]): number {
  let n = 0;
  for (const report of reports) {
    if (isSafe(report)) {
      n += 1;
    }
  }

  return n;
};

/**
  * Check if the `report` is safe
  *
  * @time O(n)
  * @space O(1)
  */
export function isSafe(report: Report): boolean {
  // Any report containing one or zero levels is valid.
  if (report.length <= 1) {
    return true;
  }

  // All level changes should be increasing or decreasing. Using the first two
  // values we can decide which function we should use.
  const isMonotonic = isIncreasing(report[0], report[1])
    ? isIncreasing
    : isDecreasing;

  for (let i = 1; i < report.length; i++) {
    const previous = report[i - 1];
    const current = report[i];

    if (!isDistanceWithinBounds(previous, current) || !isMonotonic(previous, current)) {
      return false;
    }
  }

  return true;
}

export function isDistanceWithinBounds(a: number, b: number) {
  const d = distance(a, b)
  return d >= 1 && d <= 3;
}

export function isIncreasing(a: number, b: number): boolean {
  return b > a;
}

export function isDecreasing(a: number, b: number): boolean {
  return b < a;
}

export function p2(reports: Report[]): number {
  let n = 0;
  for (const report of reports) {
    if (isSafeWithTolerance(report)) {
      n += 1;
    }
  }

  return n;
};

/**
  * Check if the `report` is safe with a tolerance
  *
  * @time O(n^2)
  * @space O(n)
  */
export function isSafeWithTolerance(report: Report): boolean {
  if (isSafe(report)) {
    return true;
  }

  for (let i = 0; i < report.length; i++) {
    if (isSafe(report.toSpliced(i, 1))) {
      return true;
    }
  }

  return false;
}
