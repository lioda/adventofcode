export function exo1(input: string[]): number {
  let debug = 300000
  const map = new Map(input)
  let guard = Guard.parse(input)
  guard.markPosition(map)

  while (guard.isInside(map) && debug > 0) {
    guard = guard.nextStep(map)
    guard.markPosition(map)
    --debug
  }

  if (debug <= 0) return -1
  return map.countPositions()
}

const directions = ['^', '>', '<', 'V'] as const
type Direction = (typeof directions)[number]

type Position = {
  x: number
  y: number
}

class Guard {
  static parse(input: string[]): Guard {
    const guardPosition = input.reduce<Position>(
      (acc, line, y) => {
        const x = line.split('').findIndex((c) => c === '^')
        return x === -1 ? acc : { x, y }
      },
      { x: -1, y: -1 },
    )
    return new Guard(guardPosition, '^')
  }
  constructor(private readonly position: Position, private readonly direction: Direction) {}

  public isInside(map: Map): boolean {
    return map.isCellValid(this.position)
  }

  public nextStep(map: Map): Guard {
    const nextPosition = this.nextPosition()
    if (map.isEmpty(nextPosition)) return new Guard(nextPosition, this.direction)

    return new Guard(this.position, this.turn90Left())
  }

  private nextPosition(): Position {
    switch (this.direction) {
      case '^':
        return { x: this.position.x, y: this.position.y - 1 }
      case 'V':
        return { x: this.position.x, y: this.position.y + 1 }
      case '<':
        return { x: this.position.x - 1, y: this.position.y }
      case '>':
        return { x: this.position.x + 1, y: this.position.y }
    }
  }

  private turn90Left(): Direction {
    switch (this.direction) {
      case '^':
        return '>'
      case '>':
        return 'V'
      case 'V':
        return '<'
      case '<':
        return '^'
    }
  }

  public markPosition(map: Map): void {
    map.markPosition(this.position)
  }
}

enum Cell {
  empty,
  block,
}

class Map {
  private readonly markedPositions: Set<string> = new Set()
  private readonly cells: Cell[][]
  constructor(lines: string[]) {
    this.cells = lines.map((line) => line.split('').map((c) => (c === '#' ? Cell.block : Cell.empty)))
  }

  public markPosition(position: Position): void {
    if (!this.isCellValid(position)) return

    this.markedPositions.add(`${position.x} / ${position.y}`)
  }

  public countPositions(): number {
    return this.markedPositions.size
  }

  public isCellValid({ x, y }: Position): boolean {
    if (y < 0 || y >= this.cells.length) return false
    if (x < 0 || x >= (this.cells[0]?.length ?? 0)) return false

    return true
  }

  public isEmpty({ x, y }: Position): boolean {
    const cell = this.cells[y]?.[x]
    return cell !== Cell.block
  }
}
