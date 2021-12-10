import { inputByLine } from "../common/inputByLine";
import { middleCompleteScore, scoreCorruptedLines } from "./parse-line";

async function exo01() {
  const lines = new Array<string>();
  await inputByLine("src/10/input", (line) => lines.push(line));
  console.log(scoreCorruptedLines(lines));
}
async function exo02() {
  const lines = new Array<string>();
  await inputByLine("src/10/input", (line) => lines.push(line));
  console.log(middleCompleteScore(lines));
}

// exo01();
exo02();
