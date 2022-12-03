type Result01 = { sum: number };

const priorities: Record<string, number> = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
].reduce((acc, item, i) => ({ ...acc, [item]: i + 1 }), {});

export function exo01(rucksacks: string[]): Result01 {
  let sum = 0;
  for (const rucksack of rucksacks) {
    const compartment1 = rucksack.substring(0, rucksack.length / 2).split("");
    const compartment2 = rucksack.substring(rucksack.length / 2).split("");

    const sharedItem = computeSharedItem(compartment1, compartment2);
    sum += priorities[sharedItem];
  }
  return { sum };
}

function computeSharedItem(
  compartment1: string[],
  compartment2: string[]
): string {
  const a = [...compartment1].sort();
  const b = [...compartment2].sort();
  let i2 = 0;
  for (let i1 = 0; i1 < a.length; ) {
    if (a[i1] === b[i2]) return a[i1];
    if (a[i1] > b[i2]) {
      while (a[i1] > b[i2]) ++i2;
    } else {
      while (a[i1] < b[i2]) ++i1;
    }
  }

  throw new Error("common item not found");
}

export function exo02(rucksacks: string[]): Result01 {
  let sum = 0;
  let group: string[] = [];
  for (const rucksack of rucksacks) {
    group.push(rucksack);
    if (group.length === 3) {
      const sharedItem = computeBadge(group[0], group[1], group[2]);
      sum += priorities[sharedItem];
      group = [];
    }
  }
  return { sum };
}
function computeBadge(a: string, b: string, c: string): string {
  const sharedItemAB = computeSharedItems(a.split(""), b.split(""));
  const sharedItemAC = computeSharedItems(a.split(""), c.split(""));
  return computeSharedItem(sharedItemAB, sharedItemAC);
}

function computeSharedItems(s1: string[], s2: string[]): string[] {
  const result: string[] = [];
  const a = [...s1].sort();
  const b = [...s2].sort();
  let i2 = 0;
  for (let i1 = 0; i1 < a.length && i2 < b.length; ) {
    if (a[i1] === b[i2]) {
      result.push(a[i1]);
      ++i1;
    } else if (a[i1] > b[i2]) {
      while (a[i1] > b[i2]) ++i2;
    } else if (a[i1] < b[i2]) {
      while (a[i1] < b[i2]) ++i1;
    }
  }

  return result;
}
