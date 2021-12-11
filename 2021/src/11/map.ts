import _ from "lodash";

export type Position = { row: number; col: number };
export type Cell = Position & { value: number };

export class CaveMap {
  static parse(raw: string[]): CaveMap {
    return new CaveMap(
      raw.map((row) => row.split("").map((s) => parseInt(s, 10)))
    );
  }

  private constructor(private readonly map: number[][]) {}

  getAdjacentCells(position: Position): Cell[] {
    const positions: Position[] = [
      { row: position.row - 1, col: position.col - 1 },
      { row: position.row - 1, col: position.col },
      { row: position.row - 1, col: position.col + 1 },
      { row: position.row, col: position.col - 1 },
      { row: position.row, col: position.col + 1 },
      { row: position.row + 1, col: position.col - 1 },
      { row: position.row + 1, col: position.col },
      { row: position.row + 1, col: position.col + 1 },
    ];
    return positions.reduce((result, p) => {
      const value = this.get(p);
      if (value === undefined) {
        return result;
      }
      const cell = { ...p, value };
      result.push(cell);
      return result;
    }, new Array<Cell>());
  }

  get({ row, col }: Position): number | undefined {
    const optionalRow = this.map[row] ?? [];
    return optionalRow[col];
  }

  inc({ row, col }: Position): number {
    const optionalRow = this.map[row] ?? [];
    const newValue = ++optionalRow[col];
    return newValue;
  }

  reset({ row, col }: Position): void {
    const optionalRow = this.map[row] ?? [];
    optionalRow[col] = 0;
  }

  toMap(): number[][] {
    return _.cloneDeep(this.map);
  }
  positions(): Position[] {
    return this.map
      .map((row, rowIdx) =>
        row.map((_, colIdx) => ({ row: rowIdx, col: colIdx }))
      )
      .flat();
  }
}
