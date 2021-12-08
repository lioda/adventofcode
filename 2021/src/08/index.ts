import { inputByLine } from "../common/inputByLine";
import { Exo02 } from "./exo02";
import { OutputCounter } from "./output-counter";

async function exo01() {
  const counter = new OutputCounter();
  await inputByLine("src/08/input", (l) => counter.count(l));
  console.log(counter.countUniquePatternDigits());
}

async function exo02() {
  const counter = new Exo02();

  await inputByLine("src/08/input", (l) => counter.solve(l));
  console.log(counter.sum());
}

// exo01();
exo02();
