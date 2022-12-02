import { exo01, exo02 } from "./exos";

describe("02", () => {
  describe("exo01", () => {
    it("should compute score with X/Y/Z mapping", () => {
      const input = ["A Y", "B X", "C Z"];
      const score = exo01(input);
      expect(score).toBe(15);
    });
  });
  describe("exo02", () => {
    it("should compute score with needed outcome", () => {
      const input = ["A Y", "B X", "C Z"];
      const score = exo02(input);
      expect(score).toBe(12);
    });
  });
});
