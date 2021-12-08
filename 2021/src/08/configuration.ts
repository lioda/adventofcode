import { cloneDeep } from "lodash";

export type Segment = "A" | "B" | "C" | "D" | "E" | "F" | "G";
export type Signal = "a" | "b" | "c" | "d" | "e" | "f" | "g";

export type Configuration = Record<Segment, Signal>;

const segments: Segment[] = ["A", "B", "C", "D", "E", "F", "G"];

const all: Signal[] = ["a", "b", "c", "d", "e", "f", "g"];

export function configurations(): Configuration[] {
  const result: Configuration[] = [];
  return permut(all, [...segments], {});
}

export function permut(
  signals: Signal[],
  segments: Segment[],
  config: Partial<Configuration>
): Configuration[] {
  if (signals.length === 1) {
    const signal = signals[0];
    const segment = segments[0];
    config[segment] = signal;
    return [config as Configuration];
  }

  const permutations = signals
    .map((signal) => {
      const otherSignals = signals.filter((s) => s !== signal);
      const [segment, ...otherSegments] = segments;
      const nextConfig = cloneDeep(config);
      nextConfig[segment] = signal;
      return permut(otherSignals, otherSegments, nextConfig);
    })
    .flat();

  return permutations;
}
