import { exo01, exo02 } from "./exos";

describe("03", () => {
  const input = [
    "vJrwpWtwJgWrhcsFMMfFFhFp",
    "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL",
    "PmmdzqPrVvPwwTWBwg",
    "wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn",
    "ttgJtRGJQctTZtZT",
    "CrZsJsPPZsGzwwsLwLmpwMDw",
  ];
  describe("exo01", () => {
    it("", () => {
      const result = exo01(input);
      expect(result).toEqual({
        sum: 157,
      });
    });
  });
  describe("exo02", () => {
    it("", () => {
      const result = exo02(input);
      expect(result).toEqual({
        sum: 70,
      });
    });
  });
});
