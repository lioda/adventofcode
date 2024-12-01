import { Lines } from '../exercise/index.js'

export class Exo01 {
  public async distance(lineReader: Lines): Promise<number> {
    const { left, right } = await this.extractLeftAndRight(lineReader)

    left.sort((a, b) => a - b)
    right.sort((a, b) => a - b)

    return this.zip(left, right)
      .map(([a, b]) => Math.abs(a - b))
      .reduce((a, b) => a + b, 0)
  }

  private async extractLeftAndRight(lineReader: Lines): Promise<{ left: number[]; right: number[] }> {
    const numbers = await lineReader.map((s) => this.extractNumbers(s))
    return numbers.reduce<{ left: number[]; right: number[] }>(
      (acc, leftAndRight) => ({ left: [...acc.left, leftAndRight[0]], right: [...acc.right, leftAndRight[1]] }),
      {
        left: [],
        right: [],
      },
    )
  }

  private extractNumbers(s: string): [number, number] {
    const x = s.match(/^([0-9]+)[^0-9]+([0-9]+)$/)
    if (!x) throw new Error('impossible to parse line')

    return [parseInt(x[1] ?? ''), parseInt(x[2] ?? '')]
  }

  private zip(left: number[], right: number[]): [number, number][] {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return left.map((value, i) => [value, right[i]!])
  }

  public async similarity(lineReader: Lines): Promise<number> {
    const { left, right } = await this.extractLeftAndRight(lineReader)

    return left.map((n) => right.filter((x) => x === n).length * n).reduce((a, b) => a + b, 0)
  }
}
