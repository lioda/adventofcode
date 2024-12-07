export function step01(input: string): number {
  const muls = input.match(/mul\([0-9]{1,3},[0-9]{1,3}\)/gm)
  return (
    muls
      ?.map((mul) =>
        mul
          .replace('mul(', '')
          .replace(')', '')
          .split(',')
          .map((x) => parseInt(x))
          .reduce((a, b) => a * b),
      )
      .reduce((a, b) => a + b) ?? 0
  )
}
