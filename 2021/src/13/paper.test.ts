import { inputByLine } from "../common/inputByLine";
import { Paper } from "./paper";

describe("Paper", () => {
  const input = [
    "6,10",
    "0,14",
    "9,10",
    "0,3",
    "10,4",
    "4,11",
    "6,0",
    "6,12",
    "4,1",
    "0,13",
    "10,12",
    "3,4",
    "3,0",
    "8,4",
    "1,10",
    "2,14",
    "8,10",
    "9,0",
    "",
    "fold along y=7",
    "fold along x=5",
  ];

  it("should count dots", () => {
    const paper = new Paper(1);

    input.slice(0, -2).forEach((line) => paper.parse(line));

    expect(paper.countDots()).toBe(18);
  });

  it("should do one vertical fold", () => {
    const paper = new Paper(1);

    input.forEach((line) => paper.parse(line));

    expect(paper.countDots()).toBe(17);
  });

  it("should do one horizontal fold", () => {
    const paper = new Paper(1);

    [
      //
      "0,0",
      "0,3",
      "1,0",
      "2,2",
      "",
      "fold along x=1",
    ].forEach((line) => paper.parse(line));

    expect(paper.countDots()).toBe(3);
  });
  it("should do another horizontal fold", () => {
    const paper = new Paper(2);

    input.forEach((line) => paper.parse(line));

    expect(paper.countDots()).toBe(16);
  });

  it("should solve puzzle", async () => {
    const paper = new Paper(1);
    await inputByLine("src/13/input", (line) => {
      paper.parse(line);
    });

    expect(paper.countDots()).toBeLessThan(953);
  });
});
