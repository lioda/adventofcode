import { inputByLine } from "../common/inputByLine";
import { Heightmap } from "./heightmap";

async function exo01() {
  const lines: string[] = [];
  await inputByLine("src/09/input", (l) => lines.push(l));

  const map = Heightmap.parse(lines);
  console.log(map.findLowPoints());
}
async function exo02() {
  const lines: string[] = [];
  await inputByLine("src/09/input", (l) => lines.push(l));

  const map = Heightmap.parse(lines);
  console.log(map.findLargestBasins());
}

exo02();
