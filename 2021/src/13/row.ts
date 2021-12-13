import { uniq } from "lodash";

export class Row {
  private readonly dots: number[];
  constructor(dots: number[]) {
    this.dots = dots.sort((a, b) => a - b);
  }

  add(col: number): Row {
    return new Row(this.dots.concat([col]));
  }

  fusion(other: Row): Row {
    return new Row(uniq(this.dots.concat(other.dots)));
  }

  countDots(): number {
    return this.dots.length;
  }

  fold(col: number): Row {
    const dots: number[] = [];
    // const max = Math.max(...this.dots);
    for (let i = 0; i < col; ++i) {
      const destination = col + (col - i);
      if (this.dots.includes(i) || this.dots.includes(destination)) {
        dots.push(i);
      }
    }
    return new Row(dots);
  }

  display(): string {
    if (!this.dots.length) return "";
    const max = Math.max(...this.dots);
    const result = new Array(max).fill(" ");

    // for (let i = 0; i < max+1; ++i) {
    for (const dot of this.dots) {
      result[dot] = "#";
      //   const destination = col + (col - i);
      //   if (this.dots.includes(i) || this.dots.includes(destination)) {
      //     dots.push(i);
      //   }
    }

    return result.join("");
  }
}
