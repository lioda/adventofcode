import { inputByLine } from "../common/inputByLine";
import { DepthGrid } from "./grid";
import {
  DiagonalLine,
  DiagonalParser,
  HorizontalAndVerticalLineParser,
  Line,
  markAllDiagonalPoints,
  markAllPoints,
} from "./line";

async function exo01() {
  const parser = new HorizontalAndVerticalLineParser();
  const grid = new DepthGrid();
  await inputByLine("src/05/input", (line) => {
    const vents = parser.parse(line);
    if (vents) {
      markAllPoints(vents, grid);
    }
  });
  console.log(grid.countMostDangerous());
}
async function exo02() {
  const parser = new HorizontalAndVerticalLineParser();
  const diagonalParser = new DiagonalParser();
  const grid = new DepthGrid();
  await inputByLine("src/05/input", (line) => {
    let vents = parser.parse(line);
    if (vents) {
      markAllPoints(vents, grid);
    } else {
      const diagonal = diagonalParser.parse(line);
      markAllDiagonalPoints(diagonal, grid);
    }
  });
  console.log(grid.countMostDangerous());
}

exo02();
