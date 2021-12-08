import { inputByLine } from "../common/inputByLine";
import { FishPopulation } from "./generation";

async function exo01() {
  await inputByLine("src/06/input", (line) => {
    const population = FishPopulation.parse(line);
    console.log(population.countFishesAtGeneration(80));
  });
}
async function exo02() {
  await inputByLine("src/06/input", (line) => {
    const population = FishPopulation.parse(line);
    console.log(population.countFishesAtGeneration(256));
  });
}

exo02();
