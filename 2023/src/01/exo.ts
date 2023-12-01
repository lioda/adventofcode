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
  public combine(lineReader: Lines): Promise<number> {
    return lineReader.map((s) => this.extractNumber(s)).then((arr) => arr.reduce((a, b) => a + b))
  }

  private extractNumber(s: string): number {
    const [first, last] = this.keepDigit(s)

    return first * 10 + last
  }

  private keepDigit(s: string): [number, number] {
    let first = 0
    let last = 0

    const calibration = new Calibration(s)

    while (!calibration.over()) {
      const digit = calibration.extractNextNumber()
      if (digit) {
        if (!first) {
          first = digit
          last = digit
        } else {
          last = digit
        }
      }
    }

    return [first, last]
  }
}

class Calibration {
  private s: string
  constructor(originalString: string) {
    this.s = originalString + ''
  }

  public over(): boolean {
    return this.s.length === 0
  }

  public extractNextNumber(): number | undefined {
    const found = Object.keys(patterns).find((pattern) => this.s.startsWith(pattern)) as keyof typeof patterns
    if (!found) {
      this.shiftOneChar()
      return undefined
    }

    const digit = patterns[found as keyof typeof patterns]
    this.shiftOneChar()

    return digit
  }

  private shiftOneChar() {
    this.s = this.s.slice(1)
  }
}
