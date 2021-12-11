import { CaveMap } from "./map";
import { findFirstSync, runStep, runSteps } from "./step";
describe("step", () => {
  function display(map: number[][]): string {
    return map.map((row) => row.join("")).join("\n");
  }
  describe("runStep", () => {
    it("should increases all values", () => {
      const map = CaveMap.parse(["111", "222"]);

      runStep(map);

      expect(map.toMap()).toEqual([
        [2, 2, 2],
        [3, 3, 3],
      ]);
    });

    it("should flash a cell above 9", () => {
      const map = CaveMap.parse(["111", "191", "111"]);

      runStep(map);

      expect(map.toMap()).toEqual([
        [3, 3, 3],
        [3, 0, 3],
        [3, 3, 3],
      ]);
    });

    it("should make flash adjacent cells if they reach 9", () => {
      const map = CaveMap.parse([
        "111", //
        "198",
        "181",
      ]);

      runStep(map);

      expect(display(map.toMap())).toEqual(
        display([
          [3, 4, 4],
          [4, 0, 0],
          [4, 0, 5],
        ])
      );
    });
  });

  describe("runSteps", () => {
    it("should run many steps", () => {
      const input = ["11111", "19991", "19191", "19991", "11111"];
      const map = CaveMap.parse(input);

      runSteps(map, 2);

      expect(display(map.toMap())).toEqual(
        `45654
51115
61116
51115
45654`
      );
    });

    const input = [
      "5483143223",
      "2745854711",
      "5264556173",
      "6141336146",
      "6357385478",
      "4167524645",
      "2176841721",
      "6882881134",
      "4846848554",
      "5283751526",
    ];

    it("should count flashes for 10 steps", () => {
      const map = CaveMap.parse(input);

      const flashes = runSteps(map, 10);

      expect(flashes).toBe(204);
    });
    it("should count flashes for 100 steps", () => {
      const map = CaveMap.parse(input);

      const flashes = runSteps(map, 100);

      expect(flashes).toBe(1656);
    });
  });

  describe("findFirstSync", () => {
    const input = [
      "5483143223",
      "2745854711",
      "5264556173",
      "6141336146",
      "6357385478",
      "4167524645",
      "2176841721",
      "6882881134",
      "4846848554",
      "5283751526",
    ];
    it("should find first sync", () => {
      const map = CaveMap.parse(input);

      const firstSync = findFirstSync(map);

      expect(firstSync).toBe(195);
    });
  });
});
