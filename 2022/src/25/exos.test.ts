import { exo01, fromSnafu, toSnafu } from "./exos";

describe("25", () => {
  describe("fromSnafu", () => {
    it("should parse numbers with digits", () => {
      const result = fromSnafu("122");

      expect(result).toBe(37);
    });

    it("should parse numbers with simple minus", () => {
      const result = fromSnafu("1-12");

      expect(result).toBe(107);
    });

    it("should parse numbers with double minus", () => {
      const result = fromSnafu("2=01");

      expect(result).toBe(201);
    });

    it.each([
      { input: "1=-0-2", expected: 1747 },
      { input: "12111", expected: 906 },
      { input: "2=0=", expected: 198 },
      { input: "21", expected: 11 },
      { input: "2=01", expected: 201 },
      { input: "111", expected: 31 },
      { input: "20012", expected: 1257 },
      { input: "112", expected: 32 },
      { input: "1=-1=", expected: 353 },
      { input: "1-12", expected: 107 },
      { input: "12", expected: 7 },
      { input: "1=", expected: 3 },
      { input: "122", expected: 37 },
      { input: "1=2", expected: 17 },
      { input: "1-=", expected: 18 },
      { input: "1-2", expected: 22 },
      { input: "10=", expected: 23 },
    ])("should parse number $input to $expected", ({ input, expected }) => {
      expect(fromSnafu(input)).toEqual(expected);
    });
  });

  describe("toSnafu", () => {
    it.each([
      { input: 1, expected: "1" },
      { input: 10, expected: "20" },
      { input: 37, expected: "122" },
      { input: 9, expected: "2-" },
      { input: 8, expected: "2=" },
      { input: 353, expected: "1=-1=" },
      { input: 17, expected: "1=2" },
      { input: 18, expected: "1-=" },
      { input: 23, expected: "10=" },
    ])("should parse number $input to $expected", ({ input, expected }) => {
      const result = toSnafu(input);

      //   if (input !== fromSnafu(result)) {
      //     //   expect(input).toEqual(fromSnafu(result));
      //     expect(result).toEqual("");
      //   }
      //     // expect(toSnafu(input)).toEqual(fromSnafu(result));
      expect(result).toEqual(expected);
    });
  });

  const input = [
    "1=-0-2",
    "12111",
    "2=0=",
    "21",
    "2=01",
    "111",
    "20012",
    "112",
    "1=-1=",
    "1-12",
    "12",
    "1=",
    "122",
  ];
  describe("exo01", () => {
    it("should add all snafu numbers", () => {
      const result = exo01(input);
      expect(result).toEqual("2=-1=0");
    });
  });
});
