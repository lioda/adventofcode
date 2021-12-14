import { inputByLine } from "../common/inputByLine";
import { Polymer } from "./polymer";

async function exo01() {
  const polymer = new Polymer();
  await inputByLine("src/14/input", (line) => polymer.parse(line));

  polymer.generation(10);

  console.log(polymer.elementsDiff());
}

exo01();
