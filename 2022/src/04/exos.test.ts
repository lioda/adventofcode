import { exo01, exo02 } from "./exos";

describe("04", () => {
  const input = [
    "2-4,6-8",
    "2-3,4-5",
    "5-7,7-9",
    "2-8,3-7",
    "6-6,4-6",
    "2-6,4-8",
  ];
  describe("exo01", () => {
    it("should find contained sections", () => {
      const result = exo01(input);

      expect(result).toEqual({ contained: 2 });
    });
  });
  describe("exo01", () => {
    it("should find overlapping sections", () => {
      const result = exo02(input);

      expect(result).toEqual({ overlapped: 4 });
    });
  });
});
