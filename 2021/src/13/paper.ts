import { Row } from "./row";

export class Paper {
  private readonly rows: Record<number, Row> = {};
  private folded: number = 0;
  constructor(private readonly countFolds: number) {}
  parse(line: string): void {
    if (!line) {
      return;
    }
    if (line.startsWith("fold along")) {
      if (this.folded === this.countFolds) return;

      this.folded += 1;
      this.parseFold(line);
      return;
    }
    const [col, row] = line.split(",").map((s) => parseInt(s, 10));
    this.rows[row] = (this.rows[row] ?? new Row([])).add(col);
  }

  private parseFold(line: string) {
    const [direction, distance] = line.replace("fold along ", "").split("=");
    if (direction === "y") {
      this.verticalFold(parseInt(distance, 10));
    } else if (direction === "x") {
      this.horizontalFold(parseInt(distance, 10));
    }
  }

  countDots(): number {
    return Object.values(this.rows).reduce(
      (acc, row) => acc + row.countDots(),
      0
    );
  }

  private verticalFold(row: number): void {
    const max = Math.max(...Object.keys(this.rows).map((s) => parseInt(s)));
    for (let i = 0; i < row; ++i) {
      const destination = row + (row - i);
      const toMerge = this.rows[destination];
      delete this.rows[destination];
      if (!toMerge) continue;
      this.rows[i] = (this.rows[i] ?? new Row([])).fusion(toMerge);
    }
  }

  private horizontalFold(col: number): void {
    const max = Math.max(...Object.keys(this.rows).map((s) => parseInt(s)));
    for (let i = 0; i <= max; ++i) {
      const folded = (this.rows[i] ?? new Row([])).fold(col);
      this.rows[i] = folded;
    }
  }

  display() {
    const max = Math.max(...Object.keys(this.rows).map((s) => parseInt(s)));
    for (let i = 0; i < max; ++i) {
      const row = this.rows[i];
      if (!row) continue;
      const line = row.display();
      if (line) console.log(line);
    }
  }
}
