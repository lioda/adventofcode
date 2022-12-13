import { applyDirection, applyTailMovement, exo01, exo02, parse } from "./exos";

describe("09", () => {
  const input = ["R 4", "U 4", "L 3", "D 1", "R 4", "D 1", "L 5", "R 2"];
  describe("exo01", () => {
    it.each([
      { line: "R 4", expected: { direction: "R", value: 4 } },
      { line: "L 3", expected: { direction: "L", value: 3 } },
      { line: "U 2", expected: { direction: "U", value: 2 } },
      { line: "D 1", expected: { direction: "D", value: 1 } },
    ])("should parse command", ({ line, expected }) => {
      const result = parse(line);

      expect(result).toEqual(expected);
    });
    it.each([
      { direction: "R", expected: { x: 1, y: 0 } } as const,
      { direction: "L", expected: { x: -1, y: 0 } } as const,
      { direction: "U", expected: { x: 0, y: 1 } } as const,
      { direction: "D", expected: { x: 0, y: -1 } } as const,
    ])("move head", ({ direction, expected }) => {
      const pos = { x: 0, y: 0 };

      const result = applyDirection(pos, direction);

      expect(result).toEqual(expected);
    });

    describe("applyTailMovement", () => {
      it("when tail is equal head then do not move", () => {
        const pos1 = { x: 0, y: 0 };

        const result = applyTailMovement(pos1, pos1);

        expect(result).toEqual(pos1);
      });
      it.each([
        { head: { x: 1, y: 0 } },
        { head: { x: -1, y: 0 } },
        { head: { x: 0, y: 1 } },
        { head: { x: 0, y: -1 } },
        { head: { x: 1, y: 1 } },
        { head: { x: -1, y: 1 } },
        { head: { x: 1, y: -1 } },
        { head: { x: -1, y: -1 } },
      ])("when tail is touching head then do not move", ({ head }) => {
        const tail = { x: 0, y: 0 };

        const result = applyTailMovement(head, tail);

        expect(result).toEqual(tail);
      });
      it.each([
        { head: { x: 2, y: 0 }, expected: { x: 1, y: 0 } },
        { head: { x: -2, y: 0 }, expected: { x: -1, y: 0 } },
        { head: { x: 0, y: 2 }, expected: { x: 0, y: 1 } },
        { head: { x: 0, y: -2 }, expected: { x: 0, y: -1 } },
      ])(
        "when tail is 2 steps in one direction then move one step in this direction",
        ({ head, expected }) => {
          const pos2 = { x: 0, y: 0 };

          const result = applyTailMovement(head, pos2);

          expect(result).toEqual(expected);
        }
      );
      it.each([
        { head: { x: 1, y: 2 }, expected: { x: 1, y: 1 } },
        { head: { x: 2, y: 1 }, expected: { x: 1, y: 1 } },
        { head: { x: -1, y: -2 }, expected: { x: -1, y: -1 } },
      ])(
        "when tail is not touching and not in same row and column then move one step in diagonal",
        ({ head, expected }) => {
          const pos2 = { x: 0, y: 0 };

          const result = applyTailMovement(head, pos2);

          expect(result).toEqual(expected);
        }
      );
    });

    it("should count how many positions the tail visited", () => {
      const result = exo01(input);

      expect(result).toBe(13);
    });
  });

  describe("exo02", () => {
    it("should visit only 1 position", () => {
      expect(exo02(input)).toBe(1);
    });
    it("should visit 36 positions", () => {
      const largerInput = [
        "R 5",
        "U 8",
        "L 8",
        "D 3",
        "R 17",
        "D 10",
        "L 25",
        "U 20",
      ];
      expect(exo02(largerInput)).toBe(36);
    });
  });
});
