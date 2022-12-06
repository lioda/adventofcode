import { exo01, exo02 } from "./exos";

describe("06", () => {
  describe("exo01", () => {
    it("should return the position of the start of the packet", () => {
      expect(exo01("mjqjpqmgbljsphdztnvjfqwrcgsmlb")).toBe(7);
      expect(exo01("bvwbjplbgvbhsrlpgdmjqwftvncz")).toBe(5);
      expect(exo01("nppdvjthqldpwncqszvftbrmjlhg")).toBe(6);
      expect(exo01("nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg")).toBe(10);
      expect(exo01("zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw")).toBe(11);
    });
  });
  describe("exo02", () => {
    it("should return the position of the start of the message", () => {
      expect(exo02("mjqjpqmgbljsphdztnvjfqwrcgsmlb")).toBe(19);
      expect(exo02("bvwbjplbgvbhsrlpgdmjqwftvncz")).toBe(23);
      expect(exo02("nppdvjthqldpwncqszvftbrmjlhg")).toBe(23);
      expect(exo02("nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg")).toBe(29);
      expect(exo02("zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw")).toBe(26);
    });
  });
});
