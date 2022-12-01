import { exo01, exo02 } from ".";

describe("day 1", () => {
  describe("exo01", () => {
    it("count increase steps", () => {
      expect(
        exo01([
          "1000",
          "2000",
          "3000",
          "",
          "4000",
          "",
          "5000",
          "6000",
          "",
          "7000",
          "8000",
          "9000",
          "",
          "10000",
        ])
      ).toEqual({ maxElve: 4, maxCalories: 24000 });
    });
  });
  describe("exo01", () => {
    it("count increase steps", () => {
      expect(
        exo02([
          "1000",
          "2000",
          "3000",
          "",
          "4000",
          "",
          "5000",
          "6000",
          "",
          "7000",
          "8000",
          "9000",
          "",
          "10000",
        ])
      ).toEqual({
        sum: 45000,
        top: [
          { maxElve: 4, maxCalories: 24000 },
          { maxElve: 3, maxCalories: 11000 },
          { maxElve: 5, maxCalories: 10000 },
        ],
      });
    });
  });
});
