import {
  columnFromBottom,
  columnFromTop,
  exo01,
  parse,
  rowFromLeft,
  rowFromRight,
  lookToRightFrom,
  lookToLeftFrom,
  lookToBottomFrom,
  lookToTopFrom,
  scenicScore,
  exo02,
} from "./exos";

describe("08", () => {
  const input = ["30373", "25512", "65332", "33549", "35390"];

  describe("exo01", () => {
    describe("extract rows and column", () => {
      it("rowFromLeft should extract a row as seen from left", () => {
        const map = parse(input);
        const line = rowFromLeft(2, map);
        expect(line).toEqual([
          { size: 6, coordinate: { row: 2, column: 0 } },
          { size: 5, coordinate: { row: 2, column: 1 } },
          { size: 3, coordinate: { row: 2, column: 2 } },
          { size: 3, coordinate: { row: 2, column: 3 } },
          { size: 2, coordinate: { row: 2, column: 4 } },
        ]);
      });
      it("rowFromRight should extract a row as seen from right", () => {
        const map = parse(input);
        const line = rowFromRight(2, map);
        expect(line).toEqual([
          { size: 2, coordinate: { row: 2, column: 4 } },
          { size: 3, coordinate: { row: 2, column: 3 } },
          { size: 3, coordinate: { row: 2, column: 2 } },
          { size: 5, coordinate: { row: 2, column: 1 } },
          { size: 6, coordinate: { row: 2, column: 0 } },
        ]);
      });
      it("columnFromTop should extract a row as seen from left", () => {
        const map = parse(input);
        const line = columnFromTop(2, map);
        expect(line).toEqual([
          { size: 3, coordinate: { row: 0, column: 2 } },
          { size: 5, coordinate: { row: 1, column: 2 } },
          { size: 3, coordinate: { row: 2, column: 2 } },
          { size: 5, coordinate: { row: 3, column: 2 } },
          { size: 3, coordinate: { row: 4, column: 2 } },
        ]);
      });
      it("columnFromBottom should extract a row as seen from left", () => {
        const map = parse(input);
        const line = columnFromBottom(3, map);
        expect(line).toEqual([
          { size: 9, coordinate: { row: 4, column: 3 } },
          { size: 4, coordinate: { row: 3, column: 3 } },
          { size: 3, coordinate: { row: 2, column: 3 } },
          { size: 1, coordinate: { row: 1, column: 3 } },
          { size: 7, coordinate: { row: 0, column: 3 } },
        ]);
      });
    });
    it("should count all visible trees", () => {
      const result = exo01(input);

      expect(result).toEqual(21);
    });
  });

  describe("exo02", () => {
    it("lookToRightFrom should extract a row as seen when looking to right from a point in the map", () => {
      const map = parse(input);
      const line = lookToRightFrom({ row: 1, column: 2 }, map);
      expect(line).toEqual([
        { size: 1, coordinate: { row: 1, column: 3 } },
        { size: 2, coordinate: { row: 1, column: 4 } },
      ]);
    });
    it("lookToLeftFrom should extract a row as seen when looking from left from a point in the map", () => {
      const map = parse(input);
      const line = lookToLeftFrom({ row: 1, column: 2 }, map);
      expect(line).toEqual([
        { size: 5, coordinate: { row: 1, column: 1 } },
        { size: 2, coordinate: { row: 1, column: 0 } },
      ]);
    });
    it("lookToBottomFrom should extract a row as seen when looking from left from a point in the map", () => {
      const map = parse(input);
      const line = lookToBottomFrom({ row: 1, column: 2 }, map);
      expect(line).toEqual([
        { size: 3, coordinate: { row: 2, column: 2 } },
        { size: 5, coordinate: { row: 3, column: 2 } },
        { size: 3, coordinate: { row: 4, column: 2 } },
      ]);
    });
    it("lookToTopFrom should extract a row as seen when looking from left from a point in the map", () => {
      const map = parse(input);
      const line = lookToTopFrom({ row: 1, column: 2 }, map);
      expect(line).toEqual([{ size: 3, coordinate: { row: 0, column: 2 } }]);
    });

    it.each([
      { row: 1, column: 2, expected: 4 },
      { row: 3, column: 2, expected: 8 },
    ])(
      "scenicScore should compute scenic score of a tree",
      ({ row, column, expected }) => {
        const map = parse(input);
        const score = scenicScore({ row, column }, map);
        expect(score).toEqual(expected);
      }
    );

    it("find the best scenic score", () => {
      const result = exo02(input);

      expect(result).toEqual(8);
    });
  });
});
