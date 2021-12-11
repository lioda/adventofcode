import { CaveMap, Position } from "./map";

export function runStep(map: CaveMap): number {
  const positions = map.positions();
  const flashed: Position[] = [];
  const toFlash: Position[] = [];

  positions.forEach((position) => {
    map.inc(position);
    const value = map.get(position) ?? -1;
    if (value > 9) {
      // console.log("toFlash", position);
      toFlash.push(position);
    }
  });

  while (toFlash.length) {
    const position = toFlash.pop()!;
    if (flashed.find((f) => f.row === position.row && f.col === position.col)) {
      continue;
    }
    flashed.push(position);

    map.getAdjacentCells(position).forEach((adj) => {
      const incremented = map.inc(adj);
      if (incremented > 9) {
        // console.log("toFlash", adj);
        toFlash.push(adj);
      }
    });
  }

  // console.log(flashed);
  // console.log(toFlash);
  flashed.forEach((position) => {
    map.reset(position);
  });
  return flashed.length;
}

export function runSteps(map: CaveMap, steps: number): number {
  let result = 0;
  for (let i = 0; i < steps; ++i) {
    result += runStep(map);
  }
  return result;
}

export function findFirstSync(map: CaveMap): number {
  // let result = 0;
  const max = 100000;
  for (let i = 0; i < max; ++i) {
    // while (true) {

    const result = runStep(map);
    if (result === 100) {
      return i + 1;
    }
  }
  throw new Error(`no sync in ${max}`);
  // }
  // return result;
}
