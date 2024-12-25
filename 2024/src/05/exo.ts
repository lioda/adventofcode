export function exo1(input: string[]): number {
  let result = 0
  const rules: number[][] = new Array(100).fill(0).map(() => [])

  let isParsingRules = true
  for (const line of input) {
    if (line === '') {
      isParsingRules = false
      continue
    }

    if (isParsingRules) {
      const [previous, next] = line.split('|')
      rules[parseInt(next ?? '-1')]?.push(parseInt(previous ?? '-1'))
    } else {
      const { seqValid, seq } = isSeqValid(line, rules)
      if (seqValid) result += middleNumber(seq)
    }
  }

  return result
}

function isSeqValid(line: string, rules: number[][]) {
  const seq = line.split(',').map((x) => parseInt(x))
  const seen = new Set<number>()
  const seqValid = seq.every((item) => {
    const isValid = isItemValidInSeq(seq, seen, rules[item] ?? [])
    seen.add(item)

    return isValid
  })
  return { seqValid, seq }
}

function isItemValidInSeq(seq: number[], seen: Set<number>, itemPreviousNumbers: number[]): boolean {
  const appliedRules = itemPreviousNumbers.filter((n) => seq.includes(n))

  if (seen.size === 0) return appliedRules.length === 0

  return appliedRules.every((n) => seen.has(n))
}

function middleNumber(seq: number[]): number {
  return seq[Math.floor(seq.length / 2)] ?? 0
}
