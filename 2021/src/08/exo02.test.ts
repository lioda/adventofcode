import { Exo02 } from "./exo02";

describe("Exo02", () => {
  it("should find config and return number for a line", () => {
    const input =
      "acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf";
    const exo = new Exo02();

    const result = exo.solve(input);

    expect(result).toEqual([5, 3, 5, 3]);
    expect(exo.sum()).toBe(5353);
  });

  it("should find config and return numbers of all lines", () => {
    const input = [
      "be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe",
      "edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc",
      "fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg",
      "fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb",
      "aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea",
      "fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb",
      "dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe",
      "bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef",
      "egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb",
      "gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce",
    ];
    const exo = new Exo02();

    const result = input.map((i) => exo.solve(i));

    expect(result).toEqual([
      [8, 3, 9, 4],
      [9, 7, 8, 1],
      [1, 1, 9, 7],
      [9, 3, 6, 1],
      [4, 8, 7, 3],
      [8, 4, 1, 8],
      [4, 5, 4, 8],
      [1, 6, 2, 5],
      [8, 7, 1, 7],
      [4, 3, 1, 5],
    ]);
    expect(exo.sum()).toBe(61229);
  });
});
