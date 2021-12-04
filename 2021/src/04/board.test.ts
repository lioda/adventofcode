import { Board } from "./board";

describe("Board", () => {
  const input = [
    " 1  2  3  4  5",
    " 6  7  8  9 10",
    "11 12 13 14 15",
    "16 17 18 19 20",
    "21 22 23 24 25",
  ];

  const allExcept = (...excepts: number[]): number => {
    const all = new Array(25)
      .fill(0)
      .reduce((sum, _, idx) => sum + (idx + 1), 0);
    const minus = excepts.reduce((a, b) => a + b);
    return all - minus;
  };

  it("should mark a number", () => {
    const board = Board.parse(input);

    board.mark(12);

    expect(board.getMarkedNumbers()).toEqual([{ row: 2, col: 1, value: 12 }]);
  });

  it("when mark last number of row then return bingo", () => {
    const board = Board.parse(input);

    expect(board.mark(11)).toBe(undefined);
    expect(board.mark(12)).toBe(undefined);
    expect(board.mark(13)).toBe(undefined);
    expect(board.mark(14)).toBe(undefined);

    const expectedSumUnmarked = allExcept(11, 12, 13, 14, 15);
    expect(board.mark(15)).toStrictEqual({
      sumUnmarkeds: expectedSumUnmarked,
      lastMarked: 15,
      mult: expectedSumUnmarked * 15,
    });
  });
  it("when mark last number of col then return bingo", () => {
    const board = Board.parse(input);

    expect(board.mark(5)).toBe(undefined);
    expect(board.mark(10)).toBe(undefined);
    expect(board.mark(15)).toBe(undefined);
    expect(board.mark(20)).toBe(undefined);

    const expectedSumUnmarked = allExcept(5, 10, 15, 20, 25);
    expect(board.mark(25)).toStrictEqual({
      sumUnmarkeds: expectedSumUnmarked,
      lastMarked: 25,
      mult: expectedSumUnmarked * 25,
    });
  });
});
