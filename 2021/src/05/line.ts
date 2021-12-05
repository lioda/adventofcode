type LineCoordinates = { x1: number; x2: number; y1: number; y2: number };
export type Line = LineCoordinates & {
  direction: "horizontal" | "vertical";
};
export type DiagonalLine = LineCoordinates & { direction: "diagonal" };

export type Point = { x: number; y: number };

export interface Grid {
  markPoint(point: Point): void;
}

export function markAllPoints({ x1, x2, y1, y2, direction }: Line, grid: Grid) {
  if (direction === "horizontal") {
    const start = Math.min(y1, y2);
    const end = Math.max(y1, y2);
    for (let y = start; y <= end; ++y) {
      grid.markPoint({ x: x1, y });
    }
    return;
  }

  const start = Math.max(x1, x2);
  const end = Math.min(x1, x2);
  for (let x = start; x >= end; --x) {
    grid.markPoint({ y: y1, x });
  }
}

export function markAllDiagonalPoints(
  { x1, x2, y1, y2 }: DiagonalLine,
  grid: Grid
) {
  const western = x1 < x2 ? { x: x1, y: y1 } : { x: x2, y: y2 };
  const eastern = x1 > x2 ? { x: x1, y: y1 } : { x: x2, y: y2 };
  const direction: "up" | "down" = western.y > eastern.y ? "up" : "down";

  let point = western;
  while (point.x <= eastern.x) {
    grid.markPoint(point);

    point = {
      x: point.x + 1,
      y: direction === "up" ? point.y - 1 : point.y + 1,
    };
  }
}

export class HorizontalAndVerticalLineParser {
  private readonly regex = /(?<x1>\d+),(?<y1>\d+) -> (?<x2>\d+),(?<y2>\d+)/;

  parse(s: string): Line | undefined {
    const array = this.regex.exec(s);
    const groups = array?.groups!;
    const coordinates = {
      x1: parseInt(groups.x1, 10),
      x2: parseInt(groups.x2, 10),
      y1: parseInt(groups.y1, 10),
      y2: parseInt(groups.y2, 10),
    };

    if (coordinates.x1 === coordinates.x2) {
      return { ...coordinates, direction: "horizontal" };
    }
    if (coordinates.y1 === coordinates.y2) {
      return { ...coordinates, direction: "vertical" };
    }

    return undefined;
  }
}

export class DiagonalParser {
  private readonly regex = /(?<x1>\d+),(?<y1>\d+) -> (?<x2>\d+),(?<y2>\d+)/;
  parse(s: string): DiagonalLine {
    const array = this.regex.exec(s);
    const groups = array?.groups!;
    const coordinates = {
      x1: parseInt(groups.x1, 10),
      x2: parseInt(groups.x2, 10),
      y1: parseInt(groups.y1, 10),
      y2: parseInt(groups.y2, 10),
    };
    return {
      ...coordinates,
      direction: "diagonal",
    };
  }
}
