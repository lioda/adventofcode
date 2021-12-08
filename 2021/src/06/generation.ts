export class FishPopulation {
  public static parse(input: string): FishPopulation {
    const splited = input.split(",").map((s) => parseInt(s));
    return new FishPopulation(splited);
  }

  private population = new Array(8).fill(0);
  private constructor(initial: number[]) {
    initial.forEach((fish) => {
      ++this.population[fish];
    });
  }

  countFishesAtGeneration(maxGeneration: number): any {
    for (let generation = 0; generation < maxGeneration; ++generation) {
      this.population = this.population.reduce(
        (newPopulation, countFishes, timer) => {
          if (!countFishes) {
            return newPopulation;
          }
          if (timer === 0) {
            newPopulation[8] = countFishes;
            newPopulation[6] += countFishes;
          } else {
            newPopulation[timer - 1] += countFishes;
          }
          return newPopulation;
        },
        new Array(8).fill(0)
      );
    }
    return this.population.reduce((a, b) => a + b);
  }
}
