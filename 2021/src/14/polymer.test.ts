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

    // expect(polymer.toString()).toEqual("NCNBCHB");
    expect(polymer.elementsDiff()).toEqual(1);
  });

  it("should generate 4 steps", () => {
    const polymer = new Polymer();
    input.forEach((line) => polymer.parse(line));

    polymer.generation(4);

    // expect(polymer.toString()).toEqual(
    //   "NBBNBNBBCCNBCNCCNBBNBBNBBBNBBNBBCBHCBHHNHCBBCBHCB"
    // );
    expect(polymer.elementsDiff()).toEqual(23 - 5);
  });

  it("should count elements after 10 steps", () => {
    const polymer = new Polymer();
    input.forEach((line) => polymer.parse(line));

    polymer.generation(10);

    expect(polymer.elementsDiff()).toEqual(1588);
  });

  it("should count elements after 40 steps", () => {
    const polymer = new Polymer();
    input.forEach((line) => polymer.parse(line));

    polymer.generation(40);

    expect(polymer.elementsDiff()).toEqual(2188189693529);
  });
});
