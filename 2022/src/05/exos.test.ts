import { parseStacks, exo01, exo02 } from "./exos";

describe("05", () => {
  const inputStr = `
    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2
`;
  const input = inputStr.split("\n");
  it("parse stacks", () => {
    const stacks = parseStacks(input);

    expect(stacks).toEqual([["Z", "N"], ["M", "C", "D"], ["P"]]);
  });
  describe("exo01", () => {
    it("do the moves", () => {
      const afterMoves = exo01(input);

      expect(afterMoves).toEqual("CMZ");
    });
  });
  describe("exo02", () => {
    it("do the moves", () => {
      const afterMoves = exo02(input);

      expect(afterMoves).toEqual("MCD");
    });
  });
});
