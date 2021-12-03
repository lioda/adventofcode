import { inputByLine } from "../common/inputByLine";
import { Exo01, Exo02 } from "./exo";

async function exo01() {
  const exo01 = new Exo01();
  await inputByLine("src/03/input", (line) => {
    exo01.parse(line);
  });
  console.log(exo01.result());
}

async function exo02() {
  const exo02 = new Exo02();
  await inputByLine("src/03/input", (line) => {
    exo02.parse(line);
  });
  console.log(exo02.result());
}

exo02();
