import { open } from "node:fs/promises";
import { exo01, exo02 } from "./exos";

describe("07", () => {
  const input = [
    "$ cd /",
    "$ ls",
    "dir a",
    "14848514 b.txt",
    "8504156 c.dat",
    "dir d",
    "$ cd a",
    "$ ls",
    "dir e",
    "29116 f",
    "2557 g",
    "62596 h.lst",
    "$ cd e",
    "$ ls",
    "584 i",
    "$ cd ..",
    "$ cd ..",
    "$ cd d",
    "$ ls",
    "4060174 j",
    "8033020 d.log",
    "5626152 d.ext",
    "7214296 k   ",
  ];
  describe("exo01", () => {
    it("should sum directories under 100_000", () => {
      const result = exo01(input);

      expect(result).toEqual(95437);
    });
    it("real input", async () => {
      const file = await open("./src/07/input.txt");
      const lines: string[] = [];
      for await (const line of file.readLines()) {
        lines.push(line);
      }
      const result = exo01(lines);

      expect(result).toEqual(1315285);
    });
  });

  describe("exo02", () => {
    it("should free directory d", () => {
      const result = exo02(input);

      expect(result).toEqual(24933642);
    });
  });
});
