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

export function step02(input: string): number {
  const tokens = input.match(/(mul\([0-9]{1,3},[0-9]{1,3}\))|(do\(\))|(don't\(\))/gm)
  if (!tokens) return 0
  const { muls } = tokens.reduce<{ enabled: boolean; muls: string[] }>(
    (acc, token) => {
      if (token.startsWith('mul') && acc.enabled) {
        acc.muls.push(token)
        return acc
      }
      return { enabled: token.startsWith('do('), muls: acc.muls }
      return acc
    },
    { enabled: true, muls: [] as string[] },
  )

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
