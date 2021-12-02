import { Exo01, ParsedLine, parseLine, PositionAim } from ".";

describe("Day 02", () => {
  describe("parse line", () => {
    it.each([
      { line: "forward 5", expected: { command: "forward", distance: 5 } },
      { line: "up 4", expected: { command: "up", distance: 4 } },
      { line: "down 15", expected: { command: "down", distance: 15 } },
    ])("should parse '$line' to give $expected", ({ line, expected }) => {
      expect(parseLine(line)).toEqual(expected);
    });
  });

  describe("ParsedLine", () => {
    describe("apply", () => {
      const initPosition = { horizontal: 10, depth: 10 };
      it("should move up", () => {
        const command = new ParsedLine("up", 4);
        expect(command.applyParsedLine(initPosition)).toEqual({
          ...initPosition,
          depth: initPosition.depth - 4,
        });
      });

      it("should move down", () => {
        const command = new ParsedLine("down", 3);
        expect(command.applyParsedLine(initPosition)).toEqual({
          ...initPosition,
          depth: initPosition.depth + 3,
        });
      });

      it("should move forward", () => {
        const command = new ParsedLine("forward", 2);
        expect(command.applyParsedLine(initPosition)).toEqual({
          ...initPosition,
          horizontal: initPosition.horizontal + 2,
        });
      });
    });
    describe("apply with aim", () => {
      const initPosition: PositionAim = { aim: 5, depth: 10, horizontal: 15 };
      it("should move up", () => {
        const command = new ParsedLine("up", 2);
        expect(command.applyParsedLineAim(initPosition)).toEqual({
          ...initPosition,
          aim: initPosition.aim - 2,
        });
      });
      it("should move down", () => {
        const command = new ParsedLine("down", 3);
        expect(command.applyParsedLineAim(initPosition)).toEqual({
          ...initPosition,
          aim: initPosition.aim + 3,
        });
      });
      it("should move forward", () => {
        const command = new ParsedLine("forward", 3);
        expect(command.applyParsedLineAim(initPosition)).toEqual({
          aim: initPosition.aim,
          horizontal: initPosition.horizontal + 3,
          depth: initPosition.depth + initPosition.aim * 3,
        });
      });
    });
  });
  it("exo01", () => {
    const input = [
      "forward 5",
      "down 5",
      "forward 8",
      "up 3",
      "down 8",
      "forward 2",
    ];
    const exo = new Exo01();
    input.forEach((line) => exo.execute(line));

    expect(exo.position()).toEqual({ horizontal: 15, depth: 10, result: 150 });
  });
});
