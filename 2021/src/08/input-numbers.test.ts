import { InputNumbers } from "./input-numbers";

describe("InputNumbers", () => {
  it("should check if matches correct config", () => {
    const input =
      "acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf";

    const numbers = new InputNumbers(input);
    const result = numbers.matches({
      A: "d",
      B: "e",
      C: "a",
      D: "f",
      E: "g",
      F: "b",
      G: "c",
    });

    expect(result).toBe(true);
  });
});
