import {
  completeLine,
  findFirstIllegalCharacter,
  middleCompleteScore,
  scoreCorruptedLines,
} from "./parse-line";

describe("parse line", () => {
  describe("findFirstIllegalCharacter", () => {
    it.each([
      { line: "{([(<{}[<>[]}>{[]{[(<()>", expected: "}" },
      { line: "[[<[([]))<([[{}[[()]]]", expected: ")" },
      { line: "[{[{({}]{}}([{[{{{}}([]", expected: "]" },
      { line: "[<(<(<(<{}))><([]([]()", expected: ")" },
      { line: "<{([([[(<>()){}]>(<<{{", expected: ">" },
    ])("should find illegal $expected in line $line", ({ line, expected }) => {
      const result = findFirstIllegalCharacter(line);
      expect(result).toEqual(expected);
    });

    it("should return undefined if line is not corrupted", () => {
      const result = findFirstIllegalCharacter("{<[[]]>}<{[{[{[]{()[[[");
      expect(result).toBeUndefined();
    });
  });

  describe("scoreCorruptedLines", () => {
    it("should count each corrupted line and add scores", () => {
      const lines = [
        "[({(<(())[]>[[{[]{<()<>>",
        "[(()[<>])]({[<{<<[]>>(",
        "{([(<{}[<>[]}>{[]{[(<()>",
        "(((({<>}<{<{<>}{[]{[]{}",
        "[[<[([]))<([[{}[[()]]]",
        "[{[{({}]{}}([{[{{{}}([]",
        "{<[[]]>}<{[{[{[]{()[[[]",
        "[<(<(<(<{}))><([]([]()",
        "<{([([[(<>()){}]>(<<{{",
        "<{([{{}}[<[[[<>{}]]]>[]]",
      ];

      const result = scoreCorruptedLines(lines);

      expect(result).toBe(26397);
    });
  });

  describe("completeLine", () => {
    it.each([
      { line: "[({(<(())[]>[[{[]{<()<>>", expected: "}}]])})]", score: 288957 },
      { line: "[(()[<>])]({[<{<<[]>>(", expected: ")}>]})", score: 5566 },
    ])(
      "should complete with missing characters",
      ({ line, expected, score }) => {
        const result = completeLine(line);
        expect(result).toEqual({ completion: expected, score });
      }
    );
  });
  describe("middleCompleteScore", () => {
    it("should complete with missing characters", () => {
      const lines = [
        "[({(<(())[]>[[{[]{<()<>>",
        "[(()[<>])]({[<{<<[]>>(",
        "{([(<{}[<>[]}>{[]{[(<()>",
        "(((({<>}<{<{<>}{[]{[]{}",
        "[[<[([]))<([[{}[[()]]]",
        "[{[{({}]{}}([{[{{{}}([]",
        "{<[[]]>}<{[{[{[]{()[[[]",
        "[<(<(<(<{}))><([]([]()",
        "<{([([[(<>()){}]>(<<{{",
        "<{([{{}}[<[[[<>{}]]]>[]]",
      ];

      const result = middleCompleteScore(lines);

      expect(result).toEqual(288957);
    });
  });
});
