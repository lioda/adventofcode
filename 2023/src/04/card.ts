export class Card {
  constructor(private readonly input: string) {}

  public getValue(): number {
    const intersection = this.computeIntersection()
    if (!intersection.length) {
      return 0
    }
    return Math.pow(2, intersection.length - 1)
  }

  private computeIntersection(): number[] {
    const numberSequence = this.input.split(':')[1]!
    const [winningNumber, ownedNumbers] = numberSequence.split('|').map((str) => this.splitNumbers(str))

    const intersection = ownedNumbers?.filter((n) => winningNumber?.includes(n)) ?? []
    return intersection
  }

  private splitNumbers(str: string): number[] {
    const items = str.split(' ')
    return items.map((item) => parseInt(item)).filter((item) => !Number.isNaN(item))
  }

  public countWinningNumbers(): number {
    return this.computeIntersection().length
  }
}
