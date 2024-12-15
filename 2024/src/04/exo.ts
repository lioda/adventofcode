export class CharacterMatrix {
  constructor(private readonly lines: string[]) {}

  public wordsFrom({ length, line, column }: { length: number; line: number; column: number }): string[] {
    const operators = [
      { l: 0, c: 1 }, // E
      { l: 0, c: -1 }, // W
      { l: 1, c: 0 }, // S
      { l: -1, c: 0 }, // N
      { l: -1, c: -1 }, // NW
      { l: -1, c: 1 }, // NE
      { l: 1, c: -1 }, // SW
      { l: 1, c: 1 }, // SE
    ]
    const result: string[] = []

    for (const operator of operators) {
      const s = new Array(length).fill(0).reduce(
        (acc, _, i) => {
          const nextPos = { line: line + operator.l * i, column: column + operator.c * i }
          return { ...nextPos, s: `${acc.s}${this.get(nextPos) ?? ''}` }
        },
        { line, column, s: '' },
      ).s

      result.push(s)
    }
    return result.filter((s) => s.length === length)
  }

  private get({ line, column }: { line: number; column: number }): string | undefined {
    if (column < 0) return undefined
    return this.lines[line]?.at(column)
  }

  public mapEach<T>(searched: string, fn: (pos: { line: number; column: number }) => T): T[] {
    return this.lines.flatMap((line, lineIdx) =>
      line.split('').reduce((acc, ch, colIdx) => (ch === searched ? [...acc, fn({ line: lineIdx, column: colIdx })] : acc), [] as T[]),
    )
  }
}

export function step01(lines: string[]) {
  const matrix = new CharacterMatrix(lines)
  return matrix
    .mapEach('X', (position) => {
      const xmases = matrix.wordsFrom({ ...position, length: 4 }).filter((w) => w === 'XMAS')
      return xmases.length
    })
    .reduce((a, b) => a + b, 0)
}
