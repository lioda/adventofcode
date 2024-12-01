import { Lines } from '../exercise/index.js'

const patterns = {
  '1': 1,
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
  '8': 8,
  '9': 9,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
}

export class Exo01 {
  public async combine(lineReader: Lines): Promise<number> {
    const numbers = await lineReader.map((s) => this.extractNumbers(s))
    const { left, right } = numbers.reduce<{ left: number[]; right: number[] }>(
      (acc, leftAndRight) => ({ left: [...acc.left, leftAndRight[0]], right: [...acc.right, leftAndRight[1]] }),
      {
        left: [],
        right: [],
      },
    )

    left.sort((a, b) => a - b)
    right.sort((a, b) => a - b)

    return this.zip(left, right)
      .map(([a, b]) => Math.abs(a - b))
      .reduce((a, b) => a + b, 0)
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
}
