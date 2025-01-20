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
  public markOccurence(map: Map): boolean {
    return map.markOccurence(this.position, this.direction)
  }
}

enum Cell {
  empty,
  block,
}

class Map {
  private nextObst: Position = { x: -1, y: 0 }
  private readonly markedPositions: Set<string> = new Set()
  private readonly markedOccurences: Set<string> = new Set()
  private readonly cells: Cell[][]
  constructor(lines: string[], public readonly forceObstruction?: Position) {
    this.cells = lines.map((line) => line.split('').map((c) => (c === '#' ? Cell.block : Cell.empty)))

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    if (forceObstruction) this.cells[forceObstruction.y]![forceObstruction.x] = Cell.block
  }

  public markPosition(position: Position): void {
    if (!this.isCellValid(position)) return

    this.markedPositions.add(`${position.x} / ${position.y}`)
  }
  public markOccurence(position: Position, direction: Direction): boolean {
    if (!this.isCellValid(position)) return false

    const occurence = `${position.x} / ${position.y} / ${direction}`
    if (this.markedOccurences.has(occurence)) return true

    this.markedOccurences.add(occurence)
    return false
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

  public nextObstruction(): Map | undefined {
    if (!this.obtainNextObstruction()) return undefined

    return new Map(
      this.cells.map((line) => line.map((c) => (c === Cell.block ? '#' : '.')).join('')),
      this.nextObst,
    )
  }

  private obtainNextObstruction(): boolean {
    const maxY = this.cells.length
    const maxX = this.cells[0]?.length ?? 0

    if (this.nextObst.x === maxX) {
      this.nextObst = { x: 0, y: this.nextObst.y + 1 }
    } else {
      this.nextObst = { x: this.nextObst.x + 1, y: this.nextObst.y }
    }
    return this.nextObst.y < maxY
  }
}

export function exo2(input: string[]): number {
  let debug = 3000000000
  const map = new Map(input)
  let loops = 0

  let currentMap = map.nextObstruction()
  while (currentMap) {
    let guard = Guard.parse(input)
    guard.markOccurence(currentMap)

    while (guard.isInside(currentMap) && debug > 0) {
      guard = guard.nextStep(currentMap)
      const alreadyOccured = guard.markOccurence(currentMap)
      if (alreadyOccured) {
        ++loops
        break
      }
      --debug
    }

    if (debug <= 0) return -1
    currentMap = map.nextObstruction()
  }
  return loops
}
