const stackIndexes = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;

export function parseStacks(input: string[]): string[][] {
  const result: string[][] = new Array(stackIndexes.length)
    .fill(0)
    .map((_) => []);
  for (const line of input) {
    if (line.startsWith(" 1 ")) break;
    for (const stackIndex of stackIndexes) {
      const i = stackIndex - 1;
      const start = i * 4;
      const crate = line.substring(start, start + 3);
      const crateName = crate.trim()[1];
      if (crateName) {
        result[i].push(crateName);
      }
    }
  }
  return result.filter((s) => s.length > 0).map((s) => s.reverse());
}

export function exo01(input: string[]): string {
  const stacks = parseStacks(input);
  for (const line of input) {
    if (!line.startsWith("move")) continue;
    const matches = line.match(/move ([0-9]+) from ([0-9]+) to ([0-9]+)/);
    if (!matches) {
      throw new Error(`${line}`);
    }
    const [_, n, from, to] = matches.map((e) => parseInt(e, 10));
    for (let i = 0; i < n; ++i) {
      const crate = stacks[from - 1].pop();
      stacks[to - 1].push(crate!);
    }
  }
  console.log(stacks);
  return stacks.map((stack) => stack.pop()).join("");
}
export function exo02(input: string[]): string {
  const stacks = parseStacks(input);
  for (const line of input) {
    if (!line.startsWith("move")) continue;
    const matches = line.match(/move ([0-9]+) from ([0-9]+) to ([0-9]+)/);
    if (!matches) {
      throw new Error(`${line}`);
    }
    const [_, n, from, to] = matches.map((e) => parseInt(e, 10));
    const crates: string[] = [];
    for (let i = 0; i < n; ++i) {
      crates.push(stacks[from - 1].pop()!);
    }
    stacks[to - 1].push(...crates.reverse());
  }
  return stacks.map((stack) => stack.pop()).join("");
}
