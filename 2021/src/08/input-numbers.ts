// const inputNumbersRegex = /(\s+\w+)(\s+\w+)(\s+\w+)(\s+\w+)*\|/;

import { Configuration } from "./configuration";
import { parseNumber } from "./number";

export class InputNumbers {
  private readonly numbers: string[];
  constructor(line: string) {
    this.numbers = line
      .split("|")[0]
      .split(" ")
      .map((s) => s.trim())
      .filter((s) => s.length);
  }

  matches(config: Configuration): boolean {
    return this.numbers.every((n) => {
      const parsed = parseNumber(config, n);
      return parsed !== undefined;
    });
  }
}
