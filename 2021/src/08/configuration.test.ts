import { configurations, permut } from "./configuration";

describe("Configuration", () => {
  describe("configurations", () => {
    it("should return 5040 permutations", () => {
      expect(configurations().length).toBe(5040);
    });
    it("should return correct permutations", () => {
      const configs = configurations();
      expect(configs[0]).toEqual({
        A: "a",
        B: "b",
        C: "c",
        D: "d",
        E: "e",
        F: "f",
        G: "g",
      });
      expect(configs[1]).toEqual({
        A: "a",
        B: "b",
        C: "c",
        D: "d",
        E: "e",
        F: "g",
        G: "f",
      });
    });

    it("should permut two values", () => {
      const result = permut(["a", "b"], ["A", "B"], {});

      expect(result).toEqual([
        { A: "a", B: "b" },
        { A: "b", B: "a" },
      ]);
    });
  });
});
