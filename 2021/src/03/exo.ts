export class Exo01 {
  private lines = 0;
  private sumByPos: number[] | undefined = undefined;

  parse(line: string): void {
    this.lines += 1;
    if (this.sumByPos === undefined) {
      this.sumByPos = new Array(line.length).fill(0);
    }
    const digits = line.split("");
    digits.forEach((digit, idx) => {
      this.sumByPos![idx] += parseInt(digit, 2);
    });
  }

  result(): { gamma: number; epsilon: number; power: number } {
    const { gammaBinaryStr, epsilonBinaryStr } = this.sumByPos?.reduce(
      (acc, count1) => {
        const count0 = this.lines - count1;
        const gammaBinaryStr =
          acc.gammaBinaryStr + (count0 > count1 ? "0" : "1");
        const epsilonBinaryStr =
          acc.epsilonBinaryStr + (count0 > count1 ? "1" : "0");
        return { gammaBinaryStr, epsilonBinaryStr };
      },
      { gammaBinaryStr: "", epsilonBinaryStr: "" }
    ) ?? { gammaBinaryStr: "0", epsilonBinaryStr: "0" };
    const gamma = parseInt(gammaBinaryStr, 2);
    const epsilon = parseInt(epsilonBinaryStr, 2);
    return { gamma, epsilon, power: gamma * epsilon };
  }
}

export class Exo02 {
  private lines: number[][] = [];

  parse(line: string): void {
    const digits = line.split("");
    this.lines.push(digits.map((s) => parseInt(s, 2)));
  }

  result(): { oxygen: number; co2: number; lifeSupport: number } {
    let restOxygen = [...this.lines];
    let restCo2 = [...this.lines];
    let idx = 0;
    while (restOxygen.length > 1 || restCo2.length > 1) {
      if (restOxygen.length > 1) {
        const bitOxygen = this.mostCommon(idx, restOxygen);
        restOxygen = restOxygen.filter((digits) => digits[idx] === bitOxygen);
      }

      if (restCo2.length > 1) {
        const bitCo2 = this.leastCommon(idx, restCo2);
        restCo2 = restCo2.filter((digits) => digits[idx] === bitCo2);
      }

      idx += 1;
    }
    const oxygen = parseInt(restOxygen[0].join(""), 2);
    const co2 = parseInt(restCo2[0].join(""), 2);
    return {
      oxygen,
      co2,
      lifeSupport: oxygen * co2,
    };
  }

  private mostCommon(idx: number, lines: number[][]): number {
    const count1 = lines.reduce((sum, line) => sum + line[idx], 0);
    const count0 = lines.length - count1;
    return count1 >= count0 ? 1 : 0;
  }
  private leastCommon(idx: number, lines: number[][]): number {
    const count1 = lines.reduce((sum, line) => sum + line[idx], 0);
    const count0 = lines.length - count1;
    return count1 < count0 ? 1 : 0;
  }
}
