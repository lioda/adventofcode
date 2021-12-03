import { Exo01, Exo02 } from "./exo";

describe("day 03", () => {
  const input = [
    "00100",
    "11110",
    "10110",
    "10111",
    "10101",
    "01111",
    "00111",
    "11100",
    "10000",
    "11001",
    "00010",
    "01010",
  ];
  describe("exo 01", () => {
    it("parse each line", () => {
      const exo = new Exo01();

      input.forEach((line) => exo.parse(line));

      expect(exo.result()).toEqual({ gamma: 22, epsilon: 9, power: 198 });
    });
  });
  describe("exo 02", () => {
    it("parse each line", () => {
      const exo = new Exo02();

      input.forEach((line) => exo.parse(line));

      expect(exo.result()).toEqual({ oxygen: 23, co2: 10, lifeSupport: 230 });
    });
  });
});
