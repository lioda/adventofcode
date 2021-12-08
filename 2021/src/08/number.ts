import { isEqual } from "lodash";
import { Configuration, Segment, Signal } from "./configuration";

const numbers: Record<number, Segment[]> = {
  0: ["A", "B", "C", "E", "F", "G"],
  1: ["C", "F"],
  2: ["A", "C", "D", "E", "G"],
  3: ["A", "C", "D", "F", "G"],
  4: ["B", "C", "D", "F"],
  5: ["A", "B", "D", "F", "G"],
  6: ["A", "B", "D", "E", "F", "G"],
  7: ["A", "C", "F"],
  8: ["A", "B", "C", "D", "E", "F", "G"],
  9: ["A", "B", "C", "D", "F", "G"],
};

export function parseNumber(
  config: Configuration,
  pattern: string
): number | undefined {
  const signals: Signal[] = pattern.split("").map((s) => {
    if (
      s === "a" ||
      s === "b" ||
      s === "c" ||
      s === "d" ||
      s === "e" ||
      s === "f" ||
      s === "g"
    ) {
      return s;
    }
    throw new Error("Bad character");
  });

  const segments: Segment[] = signals.sort().reduce((acc, signal) => {
    Object.entries(config).forEach((entry) => {
      if (signal === entry[1]) {
        acc.push(entry[0] as Segment);
      }
    });
    return acc;
  }, new Array<Segment>());

  const result = Object.entries(numbers).find((entry) => {
    if (isEqual(entry[1].sort(), segments.sort())) {
      return true;
    }
    return false;
  })?.[0];

  return result ? parseInt(result, 10) : undefined;
}
