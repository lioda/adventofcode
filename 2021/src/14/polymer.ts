export class Polymer {
  private pairs: Record<string, number> = {};
  private counts: Record<string, number> = {};
  private transformation: Record<string, string> = {};
  parse(line: string) {
    if (!line) return;
    if (!line.includes("->")) {
      const elements = line.split("");
      for (let i = 1; i < elements.length; ++i) {
        const pair = [elements[i - 1], elements[i]].join("");
        this.pairs[pair] = (this.pairs[pair] ?? 0) + 1;
      }
      return;
    }

    const [pair, product] = line.split(" -> ");
    this.transformation[pair] = product;
  }

  generation(count: number) {
    for (let c = 0; c < count; ++c) {
      this.generateStep();
    }
  }

  private generateStep() {
    const counts: Record<string, number> = {};
    const result: Record<string, number> = {};

    Object.entries(this.pairs).forEach(([pair, count], idx) => {
      const product = this.transformation[pair];
      const pair1 = pair[0] + product;
      const pair2 = product + pair[1];
      result[pair1] = (result[pair1] ?? 0) + count;
      result[pair2] = (result[pair2] ?? 0) + count;

      if (idx === 0) {
        counts[pair[0]] = (counts[pair[0]] ?? 0) + count;
      }
      counts[pair[1]] = (counts[pair[1]] ?? 0) + count;
      counts[product] = (counts[product] ?? 0) + count;
    });

    this.pairs = result;
    this.counts = counts;
  }

  elementsDiff(): number {
    const elements: Record<string, number> = {};
    const result = Object.values(this.counts).reduce(
      (acc, count) => {
        if (count > acc.most) return { ...acc, most: count };
        if (count < acc.least) return { ...acc, least: count };
        return acc;
      },
      {
        most: -Infinity,
        least: Infinity,
      }
    );
    return result.most - result.least;
  }
}
