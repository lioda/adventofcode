type Row = [number, number, number, number, number];

export type MarkedNumber = {
  row: number;
  col: number;
  value: number;
};

export type Bingo = {
  sumUnmarkeds: number;
  lastMarked: number;
  mult: number;
};

export class Board {
  static parse(input: string[]): Board {
    const rows: Row[] = input.map((row) => {
      const curatedRow = row.trim().replace(/\s{2,}/g, " ");
      const rowNumbers = curatedRow.split(" ").map((n) => parseInt(n, 10));
      if (rowNumbers.length != 5)
        throw new Error(
          JSON.stringify({
            rowNumbers,
            curatedRow,
          })
        );
      return rowNumbers as Row;
    });
    return new Board(rows[0], rows[1], rows[2], rows[3], rows[4]);
  }

  private readonly rows: [Row, Row, Row, Row, Row];
  private markeds: MarkedNumber[] = [];

  private constructor(row0: Row, row1: Row, row2: Row, row3: Row, row4: Row) {
    this.rows = [row0, row1, row2, row3, row4];
  }

  mark(n: number): undefined | Bingo {
    this.rows.forEach((row, rowIdx) => {
      row.forEach((col, colIdx) => {
        if (col === n) {
          this.markeds.push({ col: colIdx, row: rowIdx, value: n });
        }
      });
    });

    const { rowsValue, colsValue } = this.markeds.reduce(
      (acc, marked) => {
        acc.rowsValue[marked.row] += 1;
        acc.colsValue[marked.col] += 1;
        return acc;
      },
      { rowsValue: [0, 0, 0, 0, 0], colsValue: [0, 0, 0, 0, 0] }
    );
    if (rowsValue.includes(5) || colsValue.includes(5)) {
      const sumUnmarkeds = this.sumUnmarkeds();
      return {
        lastMarked: n,
        sumUnmarkeds,
        mult: sumUnmarkeds * n,
      };
    }

    return undefined;
  }

  private sumUnmarkeds(): number {
    return this.rows.reduce(
      (sum, row, rowIdx) =>
        row.reduce(
          (acc, n, colIdx) =>
            this.markeds.find(
              (marked) => marked.col === colIdx && marked.row === rowIdx
            )
              ? acc
              : acc + n,
          sum
        ),
      0
    );
  }

  getMarkedNumbers(): MarkedNumber[] {
    return [...this.markeds];
  }
}
