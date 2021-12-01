import { exo01, exo02 } from ".";

describe("day 1", () => {
  describe("exo01", () => {
    it("count increase steps", () => {
      expect(exo01([199, 200, 208, 210, 200, 207, 240, 269, 260, 263])).toBe(7);
    });
  });
  describe("exo02", () => {
    it("count increase steps", () => {
      expect(exo02([199, 200, 208, 210, 200, 207, 240, 269, 260, 263])).toBe(5);
    });
  });
});
