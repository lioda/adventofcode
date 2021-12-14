export class Polymer {
  private template: string | undefined;
  private transformation: Record<string, string> = {};
  parse(line: string) {
    if (!line) return;
    if (!this.template) {
      this.template = line;
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
    if (!this.template) return;
    const result: string[] = [];
    for (let i = 1; i < this.template.length; ++i) {
      const pair = [this.template[i - 1], this.template[i]].join("");
      const product = this.transformation[pair];
      if (!result.length) {
        result.push(pair[0]);
      }
      result.push(product, pair[1]);
    }
    this.template = result.join("");
  }

  elementsDiff(): number {
    if (!this.template) return 0;

    const elements: Record<string, number> = {};
    this.template.split("").forEach((el) => {
      elements[el] = (elements[el] ?? 0) + 1;
    });
    const result = Object.values(elements).reduce(
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

  toString(): string {
    return this.template ?? "";
  }
}
