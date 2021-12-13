import { inputByLine } from "../common/inputByLine";
import { Paper } from "./paper";

async function exo01() {
  const paper = new Paper(1);
  await inputByLine("src/13/input", (line) => {
    paper.parse(line);
  });

  console.log(paper.countDots());
}
async function exo02() {
  const paper = new Paper(100);
  await inputByLine("src/13/input", (line) => {
    paper.parse(line);
  });

  paper.display();
}

// exo01();
exo02();
