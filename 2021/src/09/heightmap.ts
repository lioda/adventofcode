type Point = { row: number; col: number };
type ValuedPoint = Point & { value: number };
type LowPoint = ValuedPoint & {
  riskLevel: number;
};
type Basin = Point & { basinSize: number };

export class Heightmap {
  static parse(lines: string[]): Heightmap {
    return new Heightmap(
      lines.map((line) => line.split("").map((s) => parseInt(s, 10)))
    );
  }

  private constructor(private readonly map: number[][]) {}

  private adjacents({ row, col }: Point): ValuedPoint[] {
    const result: ValuedPoint[] = [];
    if (row > 0) {
      result.push({ value: this.map[row - 1][col], row: row - 1, col });
    }
    if (row < this.map.length - 1) {
      result.push({ value: this.map[row + 1][col], row: row + 1, col });
    }
    if (col > 0) {
      result.push({ value: this.map[row][col - 1], row, col: col - 1 });
    }
    if (col < this.map[row].length - 1) {
      result.push({ value: this.map[row][col + 1], row, col: col + 1 });
    }
    return result;
  }

  findLowPoints(): [LowPoint[], number] {
    const result: LowPoint[] = [];
    for (let row = 0; row < this.map.length; ++row) {
      const line = this.map[row];
      for (let col = 0; col < line.length; ++col) {
        const value = this.map[row][col];
        if (
          this.adjacents({ row, col }).every(
            (adjacent) => adjacent.value > value
          )
        ) {
          const point = { col, row, value, riskLevel: value + 1 };
          result.push(point);
        }
      }
    }
    return [result, result.reduce((sum, p) => sum + p.riskLevel, 0)];
  }

  basinSize(start: LowPoint): number {
    const all: Array<Point> = [start];
    const explored: Array<Point> = []; //new Set();
    const toExplore: Point[] = [start];

    while (toExplore.length > 0) {
      const p = toExplore.pop()!;
      explored.push(p);

      const adjacents = this.adjacents(p).filter((adj) => {
        if (adj.value === 9) {
          return false;
        }

        if (all.find((p) => p.row === adj.row && p.col === adj.col)) {
          return false;
        }
        return true;
      });

      all.push(...adjacents);
      toExplore.push(...adjacents);
    }

    return explored.length;
  }

  findLargestBasins(): [Basin[], number] {
    const [lowPoints] = this.findLowPoints();
    const threeLargest: Basin[] = [];

    const addLargest = (point: LowPoint, basinSize: number) => {
      threeLargest.push({ row: point.row, col: point.col, basinSize });
      threeLargest.sort((b1, b2) => b1.basinSize - b2.basinSize);
      if (threeLargest.length <= 3) {
        return;
      }
      threeLargest.shift();
    };

    for (const lowPoint of lowPoints) {
      const basinSize = this.basinSize(lowPoint);
      if (threeLargest.length < 3) {
        addLargest(lowPoint, basinSize);
        continue;
      }

      if (threeLargest.find((candidate) => basinSize > candidate.basinSize)) {
        addLargest(lowPoint, basinSize);
      }
    }

    return [
      threeLargest,
      threeLargest.reduce((acc, b) => acc * b.basinSize, 1),
    ];
  }
}
