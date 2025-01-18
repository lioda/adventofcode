type Rules = number[][]

export function exo1(input: string[]): number {
  let result = 0
  const rules: Rules = new Array(100).fill(0).map(() => [])

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

type IsSeqValid = { seqValid: true; seq: number[] } | { seqValid: false; seq: number[]; firstInvalidIndex: number }

function isSeqValid(line: string | number[], rules: Rules): IsSeqValid {
  const seq = typeof line === 'string' ? line.split(',').map((x) => parseInt(x)) : line
  const seen = new Set<number>()
  const firstInvalidIndex = seq.findIndex((item) => {
    const isValid = isItemValidInSeq(seq, seen, rules[item] ?? [])
    seen.add(item)

    const itemIsFirstInvalid = !isValid
    return itemIsFirstInvalid
  })
  const seqValid = firstInvalidIndex === -1

  if (seqValid) return { seqValid, seq }
  return { seqValid, seq, firstInvalidIndex }
}

function isItemValidInSeq(seq: number[], seen: Set<number>, itemPreviousNumbers: Rules[number]): boolean {
  const appliedRules = itemPreviousNumbers.filter((n) => seq.includes(n))

  if (seen.size === 0) return appliedRules.length === 0

  return appliedRules.every((n) => seen.has(n))
}

function middleNumber(seq: number[]): number {
  return seq[Math.floor(seq.length / 2)] ?? 0
}

export function exo2(input: string[]): number {
  let result = 0
  const rules: Rules = new Array(100).fill(0).map(() => [])

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
      if (!seqValid) result += middleNumber(correct(seq, rules))
    }
  }

  return result
}

function correct(seq: number[], rules: Rules): number[] {
  const attempt = [...seq]
  for (let i = 0; i < 3000; ++i) {
    const valid = isSeqValid(attempt, rules)
    if (valid.seqValid) {
      return attempt
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const invalid = attempt[valid.firstInvalidIndex]!
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const shouldBeAfter = rules[invalid]!.filter((n) => attempt.includes(n)).reduce(
      (max, n) => {
        const idx = attempt.findIndex((x) => x === n)
        if (idx > max.idx) {
          return { idx, n }
        }
        return max
      },
      { idx: 0, n: attempt[0] },
    )
    attempt.splice(valid.firstInvalidIndex, 1)
    attempt.splice(shouldBeAfter.idx, 0, invalid)
  }

  throw new Error(`no correction found for ${seq}`)
}
