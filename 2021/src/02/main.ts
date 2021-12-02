import { Exo01, Exo02 } from ".";
import { inputByLine } from "../common/inputByLine";

async function exo01() {
  const exo = new Exo01();
  await inputByLine("src/02/input", (line) => {
    exo.execute(line);
  });
  console.log(exo.position());
}
async function exo02() {
  const exo = new Exo02();
  await inputByLine("src/02/input", (line) => {
    exo.execute(line);
  });
  console.log(exo.position());
}

// exo01();
exo02();
