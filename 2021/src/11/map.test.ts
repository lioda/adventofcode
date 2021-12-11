import { CaveMap } from "./map";

describe("CaveMap", () => {
  const input = [
    "12345", //
    "67890", //
    "98765", //
  ];

  it("should get 8 adjacent cells", () => {
    const map = CaveMap.parse(input);

    const result = map.getAdjacentCells({ row: 1, col: 2 });

    expect(result).toEqual([
      { row: 0, col: 1, value: 2 },
      { row: 0, col: 2, value: 3 },
      { row: 0, col: 3, value: 4 },
      { row: 1, col: 1, value: 7 },
      { row: 1, col: 3, value: 9 },
      { row: 2, col: 1, value: 8 },
      { row: 2, col: 2, value: 7 },
      { row: 2, col: 3, value: 6 },
    ]);
  });

  it("should get 3 adjacent cells in a corner", () => {
    const map = CaveMap.parse(input);

    const result = map.getAdjacentCells({ row: 0, col: 0 });

    expect(result).toEqual([
      { row: 0, col: 1, value: 2 },
      { row: 1, col: 0, value: 6 },
      { row: 1, col: 1, value: 7 },
    ]);
  });

  it("should increment a cell", () => {
    const map = CaveMap.parse(input);

    const newValue = map.inc({ row: 0, col: 0 });

    expect(newValue).toBe(2);
    expect(map.get({ row: 0, col: 0 })).toEqual(2);
  });

  it("should reset a cell", () => {
    const map = CaveMap.parse(input);

    map.reset({ row: 0, col: 0 });

    expect(map.get({ row: 0, col: 0 })).toEqual(0);
  });
});
