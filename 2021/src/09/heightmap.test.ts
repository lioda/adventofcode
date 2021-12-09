import { Heightmap } from "./heightmap";

describe("Heightmap", () => {
  const input = [
    "2199943210",
    "3987894921",
    "9856789892",
    "8767896789",
    "9899965678",
  ];
  it("should evaluate low points", () => {
    const map = Heightmap.parse(input);

    expect(map.findLowPoints()).toEqual([
      [
        { value: 1, row: 0, col: 1, riskLevel: 2 },
        { value: 0, row: 0, col: 9, riskLevel: 1 },
        { value: 5, row: 2, col: 2, riskLevel: 6 },
        { value: 5, row: 4, col: 6, riskLevel: 6 },
      ],
      15,
    ]);
  });

  it.each([
    { point: { value: 1, row: 0, col: 1, riskLevel: 2 }, expected: 3 },
    { point: { value: 0, row: 0, col: 9, riskLevel: 1 }, expected: 9 },
    { point: { value: 5, row: 2, col: 2, riskLevel: 6 }, expected: 14 },
    { point: { value: 5, row: 4, col: 6, riskLevel: 6 }, expected: 9 },
  ])("should compute basin size for point $point", ({ point, expected }) => {
    const map = Heightmap.parse(input);

    expect(map.basinSize(point)).toBe(expected);
  });

  it("should find three largest basins", () => {
    const map = Heightmap.parse(input);

    expect(map.findLargestBasins()).toEqual([
      [
        { row: 0, col: 9, basinSize: 9 },
        { row: 4, col: 6, basinSize: 9 },
        { row: 2, col: 2, basinSize: 14 },
      ],
      9 * 14 * 9,
    ]);
  });
});
