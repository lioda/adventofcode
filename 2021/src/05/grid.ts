import { Grid, Point } from "./line";

export class DepthGrid implements Grid {
  private readonly map = new Map<string, number>();

  markPoint({ x, y }: Point): void {
    const key = JSON.stringify([x, y]);
    const value = this.map.get(key) ?? 0;
    this.map.set(key, value + 1);
  }

  countMostDangerous(): number {
    return Array.from(this.map.values()).reduce(
      (result, value) => (value > 1 ? result + 1 : result),
      0
    );
  }
}
