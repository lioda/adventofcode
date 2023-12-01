import { Lines } from '../exercise/index.js'

export class Exo01 {
  public combine(lineReader: Lines): Promise<number> {
    return lineReader.map((s) => this.extractNumber(s)).then((arr) => arr.reduce((a, b) => a + b))
  }

  private extractNumber(s: string): number {
    const digits = this.keepDigit(s)
    const first = digits.at(0)!
    const last = digits.at(-1)!

    return first * 10 + last
  }

  private keepDigit(s: string): number[] {
    const digits: number[] = []

    for (const c of s) {
      const potentialDigit = parseInt(c, 10)
      if (Number.isNaN(potentialDigit)) {
        continue
      }
      digits.push(potentialDigit)
    }

    return digits
  }
}
