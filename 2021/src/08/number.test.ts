import { Configuration } from "./configuration";
import { parseNumber } from "./number";

describe("", () => {
  it.each([
    { pattern: "cagedb", expected: 0 },
    { pattern: "ab", expected: 1 },
    { pattern: "gcdfa", expected: 2 },
    { pattern: "fbcad", expected: 3 },
    { pattern: "eafb", expected: 4 },
    { pattern: "cdfbe", expected: 5 },
    { pattern: "cdfgeb", expected: 6 },
    { pattern: "dab", expected: 7 },
    { pattern: "acedgfb", expected: 8 },
    { pattern: "cefabd", expected: 9 },
  ])(
    "should find number $expected for correct configuration and pattern $pattern",
    ({ pattern, expected }) => {
      const config: Configuration = {
        A: "d",
        B: "e",
        C: "a",
        D: "f",
        E: "g",
        F: "b",
        G: "c",
      };

      const result = parseNumber(config, pattern);
      expect(result).toBe(expected);
    }
  );

  it("should fail if it is not a valid number", () => {
    const config: Configuration = {
      A: "d",
      B: "e",
      C: "a",
      D: "f",
      E: "g",
      F: "b",
      G: "c",
    };

    expect(parseNumber(config, "be")).toBe(undefined);
    expect(parseNumber(config, "ebacf")).toBe(undefined);
  });
});
