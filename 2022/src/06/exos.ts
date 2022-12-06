export function exo01(input: string): number {
  return find(input, 4);
}
function find(input: string, length: number): number {
  for (let i = 0; i < input.length - length; ++i) {
    const sequence = input.substring(i, i + length).split("");
    const areAllDifferents = sequence
      .sort()
      .every((letter, index) => letter !== sequence[index + 1]);
    if (areAllDifferents) return i + length;
  }
  return -1;
}

export function exo02(input: string): number {
  return find(input, 14);
}
