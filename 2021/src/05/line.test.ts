import {
  DiagonalParser,
  Grid,
  HorizontalAndVerticalLineParser,
  markAllDiagonalPoints,
  markAllPoints,
  Point,
} from "./line";

describe("Line", () => {
  describe("HorizontalAndVerticalLineParser", () => {
    const parser = new HorizontalAndVerticalLineParser();
    it("parses horizontal line", () => {
      const line = parser.parse("1,1 -> 1,3");

      expect(line).toStrictEqual({
        x1: 1,
        y1: 1,
        x2: 1,
        y2: 3,
        direction: "horizontal",
      });
    });
    it("parses vertical line", () => {
      const line = parser.parse("9,7 -> 7,7");

      expect(line).toStrictEqual({
        x1: 9,
        y1: 7,
        x2: 7,
        y2: 7,
        direction: "vertical",
      });
    });

    it("don't parses other lines", () => {
      expect(parser.parse("4,2 -> 1,3")).toBe(undefined);
    });
  });
  describe("DiagonalParser", () => {
    const parser = new DiagonalParser();
    it("parses diagonal line", () => {
      expect(parser.parse("1,1 -> 3,3")).toStrictEqual({
        x1: 1,
        y1: 1,
        x2: 3,
        y2: 3,
        direction: "diagonal",
      });
      expect(parser.parse("9,7 -> 7,9")).toStrictEqual({
        x1: 9,
        y1: 7,
        x2: 7,
        y2: 9,
        direction: "diagonal",
      });
    });
  });

  describe("markAllPoint", () => {
    const parser = new HorizontalAndVerticalLineParser();

    it("should expand horizontal line", () => {
      const points: Point[] = [];
      const grid: Grid = {
        markPoint: (p) => points.push(p),
      };
      const line = parser.parse("1,1 -> 1,3");

      markAllPoints(line!, grid);

      expect(points).toEqual([
        { x: 1, y: 1 },
        { x: 1, y: 2 },
        { x: 1, y: 3 },
      ]);
    });

    it("should expand horizontal line in reverse direction", () => {
      const points: Point[] = [];
      const grid: Grid = {
        markPoint: (p) => points.push(p),
      };
      const line = parser.parse("2,2 -> 2,1");

      markAllPoints(line!, grid);

      expect(points).toEqual([
        { x: 2, y: 1 },
        { x: 2, y: 2 },
      ]);
    });

    it("should expand vertical line", () => {
      const points: Point[] = [];
      const grid: Grid = {
        markPoint: (p) => points.push(p),
      };
      const line = parser.parse("9,7 -> 7,7");

      markAllPoints(line!, grid);

      expect(points).toEqual([
        { x: 9, y: 7 },
        { x: 8, y: 7 },
        { x: 7, y: 7 },
      ]);
    });
  });

  describe("markAllDiagonalPoints", () => {
    const mark = (s: string): Point[] => {
      const parser = new DiagonalParser();
      const points: Point[] = [];
      const grid: Grid = {
        markPoint: (p) => points.push(p),
      };
      const line = parser.parse(s);
      markAllDiagonalPoints(line, grid);

      return points;
    };

    it("should mark all points in NW -> SE", () => {
      const points = mark("1,1 -> 3,3");

      expect(points).toEqual([
        { x: 1, y: 1 },
        { x: 2, y: 2 },
        { x: 3, y: 3 },
      ]);
    });

    it("should mark all points in SE -> NW", () => {
      const points = mark("3,3 -> 1,1");

      expect(points).toEqual([
        { x: 1, y: 1 },
        { x: 2, y: 2 },
        { x: 3, y: 3 },
      ]);
    });

    it("should mark all points in NE -> SW", () => {
      const points = mark("9,7 -> 7,9");

      expect(points).toEqual([
        { x: 7, y: 9 },
        { x: 8, y: 8 },
        { x: 9, y: 7 },
      ]);
    });

    it("should mark all points in SW -> NE", () => {
      const points = mark("7,9 -> 9,7");

      expect(points).toEqual([
        { x: 7, y: 9 },
        { x: 8, y: 8 },
        { x: 9, y: 7 },
      ]);
    });
  });
});
