import { uniqWith } from "lodash";

type TreeMap = number[][];
type TreeCoordinate = { row: number; column: number };
type TreeLine = {
  size: number;
  coordinate: TreeCoordinate;
}[];

export function exo01(input: string[]): number {
  const map = parse(input);
  const allVisibleTrees = findVisibleTreesInAllColumnAndRows(map);
  const uniques = uniqWith(
    allVisibleTrees,
    (c1, c2) => c1.column === c2.column && c1.row === c2.row
  );
  //   console.log(uniques);
  return uniques.length;
}

export function parse(input: string[]): TreeMap {
  return input.map((line) => {
    return line.split("").map((tree) => parseInt(tree, 10));
  });
}

function findVisibleTreesInAllColumnAndRows(map: TreeMap): TreeCoordinate[] {
  const result: TreeCoordinate[] = [];
  const rowCount = map.length;
  for (let i = 0; i < rowCount; ++i) {
    const fromLeft = rowFromLeft(i, map);
    result.push(...findVisibleTrees(fromLeft));
    const fromRight = rowFromRight(i, map);
    result.push(...findVisibleTrees(fromRight));
  }
  const columnCount = map[0].length;
  for (let i = 0; i < columnCount; ++i) {
    const fromTop = columnFromTop(i, map);
    result.push(...findVisibleTrees(fromTop));
    const fromBottom = columnFromBottom(i, map);
    result.push(...findVisibleTrees(fromBottom));
  }
  return result;
}

function findVisibleTrees(line: TreeLine): TreeCoordinate[] {
  const result: TreeCoordinate[] = [line[0].coordinate];
  let previousHighest = line[0].size;
  for (const tree of line) {
    if (tree.size > previousHighest) {
      result.push(tree.coordinate);
      previousHighest = tree.size;
    }
  }
  return result;
}

export function rowFromLeft(rowIndex: number, map: TreeMap): TreeLine {
  return map[rowIndex].map((tree, i) => {
    return {
      size: tree,
      coordinate: { row: rowIndex, column: i },
    };
  });
}
export function rowFromRight(rowIndex: number, map: TreeMap): TreeLine {
  return rowFromLeft(rowIndex, map).reverse();
}
export function columnFromTop(columnIndex: number, map: TreeMap): TreeLine {
  return map.map((row, i) => {
    const tree = row[columnIndex];
    return {
      size: tree,
      coordinate: { row: i, column: columnIndex },
    };
  });
}
export function columnFromBottom(columnIndex: number, map: TreeMap): TreeLine {
  return columnFromTop(columnIndex, map).reverse();
}

export function exo02(input: string[]): number {
  let best = 0;
  const map = parse(input);
  for (let row = 0; row < map.length; ++row) {
    for (let column = 0; column < map[0].length; ++column) {
      const score = scenicScore({ row, column }, map);
      best = Math.max(best, score);
    }
  }
  return best;
}

export function lookToRightFrom(from: TreeCoordinate, map: TreeMap): TreeLine {
  const result: TreeLine = [];
  const row = map[from.row];
  for (let i = from.column + 1; i < row.length; ++i) {
    result.push({ coordinate: { column: i, row: from.row }, size: row[i] });
  }
  return result;
}

export function lookToLeftFrom(from: TreeCoordinate, map: TreeMap): TreeLine {
  const result: TreeLine = [];
  const row = map[from.row];
  for (let i = from.column - 1; i >= 0; --i) {
    result.push({ coordinate: { column: i, row: from.row }, size: row[i] });
  }
  return result;
}

export function lookToBottomFrom(from: TreeCoordinate, map: TreeMap): TreeLine {
  const result: TreeLine = [];
  for (let i = from.row + 1; i < map.length; ++i) {
    result.push({
      coordinate: { column: from.column, row: i },
      size: map[i][from.column],
    });
  }
  return result;
}

export function lookToTopFrom(from: TreeCoordinate, map: TreeMap): TreeLine {
  const result: TreeLine = [];
  for (let i = from.row - 1; i >= 0; --i) {
    result.push({
      coordinate: { column: from.column, row: i },
      size: map[i][from.column],
    });
  }
  return result;
}

export function scenicScore(from: TreeCoordinate, map: TreeMap): number {
  const toLeft = viewingDistance(lookToLeftFrom(from, map), sizeOf(from, map));
  const toRight = viewingDistance(
    lookToRightFrom(from, map),
    sizeOf(from, map)
  );
  const toTop = viewingDistance(lookToTopFrom(from, map), sizeOf(from, map));
  const toBottom = viewingDistance(
    lookToBottomFrom(from, map),
    sizeOf(from, map)
  );
  return toBottom * toLeft * toRight * toTop;
}

function sizeOf(from: TreeCoordinate, map: TreeMap): number {
  return map[from.row][from.column];
}

function viewingDistance(line: TreeLine, currentHigh: number): number {
  let result = 0;
  let previousHighest = currentHigh;
  for (const tree of line) {
    ++result;
    if (tree.size >= previousHighest) {
      break;
    }
  }
  return result;
}
