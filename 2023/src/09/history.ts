export class History {
  static parse(line: string): History {
    return new History(line.split(' ').map((s) => parseInt(s)))
  }
  constructor(private readonly values: number[]) {}

  public extrapolateNextNumber(): number {
    const derivations: number[][] = [[...this.values]]

    while (!derivations.at(-1)?.every((n) => n === 0)) {
      const derivation = this.derivate(derivations.at(-1))
      derivations.push(derivation)
    }

    derivations.reverse().map((derivation, i) => {
      if (i === 0) {
        derivation.push(0)
        return derivation
      }
      const diff = derivations[i - 1]?.at(-1) ?? 0
      const toAdd = (derivation.at(-1) ?? 0) + diff

      derivation.push(toAdd)
      return derivation
    })

    return derivations.at(-1)?.at(-1) ?? 0
  }

  private derivate(values?: number[]): number[] {
    if (!values) throw new Error('WTF')

    const result: number[] = []
    for (let i = 1; i < values.length; ++i) {
      const previous = values[i - 1] ?? 0
      const current = values[i] ?? 0

      const derivated = current - previous
      result.push(derivated)
    }
    return result
  }

  public extrapolatePreviousNumber(): number {
    const derivations: number[][] = [[...this.values]]

    while (!derivations.at(-1)?.every((n) => n === 0)) {
      const derivation = this.derivate(derivations.at(-1))
      derivations.push(derivation)
    }

    return (
      derivations
        .reverse()
        .map((derivation, i) => {
          if (i === 0) {
            derivation.splice(0, 0, 0)
            return derivation
          }
          const diff = derivations[i - 1]?.at(0) ?? 0
          const toAdd = (derivation.at(0) ?? 0) - diff

          derivation.splice(0, 0, toAdd)
          return derivation
        })
        .at(-1)
        ?.at(0) ?? 0
    )
  }
}
