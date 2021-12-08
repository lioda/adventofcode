import { isEqual } from "lodash";

import { configurations } from "./configuration";
import { InputNumbers } from "./input-numbers";
import { parseNumber } from "./number";
import { OutputCounter } from "./output-counter";

const allConfigs = configurations();

export class Exo02 {
  private _sum = 0;
  solve(line: string): number[] {
    const inputs = new InputNumbers(line);
    const conf = allConfigs.find((config) => inputs.matches(config));
    if (!conf) {
      throw new Error("no config matching");
    }
    const numbers = new OutputCounter()
      .count(line)
      .map((s) => parseNumber(conf, s))
      .map((n) => {
        if (n === undefined) {
          throw new Error("cannot decode a number");
        }
        return n;
      });

    this._sum += parseInt(numbers.join(""), 10);
    return numbers;
  }

  sum(): number {
    return this._sum;
  }
}
