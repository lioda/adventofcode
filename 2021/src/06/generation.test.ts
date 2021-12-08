import { FishPopulation } from "./generation";

describe("FishPopulation", () => {
  const input = "3,4,3,1,2";
  it("should parse and generate 3 generations", () => {
    const generation = FishPopulation.parse(input);

    expect(generation.countFishesAtGeneration(3)).toBe(7);
  });
  it("should parse and generate 18 generation", () => {
    const generation = FishPopulation.parse(input);

    expect(generation.countFishesAtGeneration(18)).toBe(26);
  });
  it("should parse and generate 80 generation", () => {
    const generation = FishPopulation.parse(input);

    expect(generation.countFishesAtGeneration(80)).toBe(5934);
  });
  it("should parse and generate 256 generation", () => {
    const generation = FishPopulation.parse(input);

    expect(generation.countFishesAtGeneration(256)).toBe(26984457539);
  });
});
