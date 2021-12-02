import { inputByLine } from "./inputByLine";

describe("inputByLine", () => {
  it("should read each line of input file", async () => {
    const result: string[] = [];
    await inputByLine("src/common/fixture", (line) => result.push(line));
    expect(result).toEqual(["a", "b", "c"]);
  });
});
