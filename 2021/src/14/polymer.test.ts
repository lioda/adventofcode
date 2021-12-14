import { Polymer } from "./polymer";

describe("Polymer", () => {
  const input = [
    "NNCB",
    "",
    "CH -> B",
    "HH -> N",
    "CB -> H",
    "NH -> C",
    "HB -> C",
    "HC -> B",
    "HN -> C",
    "NN -> C",
    "BH -> H",
    "NC -> B",
    "NB -> B",
    "BN -> B",
    "BB -> N",
    "BC -> B",
    "CC -> N",
    "CN -> C",
  ];

  it("should generate one step", () => {
    const polymer = new Polymer();
    input.forEach((line) => polymer.parse(line));

    polymer.generation(1);

    expect(polymer.toString()).toEqual("NCNBCHB");
  });

  it("should generate 4 steps", () => {
    const polymer = new Polymer();
    input.forEach((line) => polymer.parse(line));

    polymer.generation(4);

    expect(polymer.toString()).toEqual(
      "NBBNBNBBCCNBCNCCNBBNBBNBBBNBBNBBCBHCBHHNHCBBCBHCB"
    );
  });

  it("should count elements after 10 steps", () => {
    const polymer = new Polymer();
    input.forEach((line) => polymer.parse(line));

    polymer.generation(10);

    expect(polymer.elementsDiff()).toEqual(1588);
  });
});
