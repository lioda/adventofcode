export function findPartNumbers(grid: string[]): number[] {
  const result: number[] = []

  for (let lineNum = 0; lineNum < grid.length; ++lineNum) {
    const line = grid[lineNum]
    const extracteds = extractNumbers(line)
    for (const extracted of extracteds) {
      if (isPartNumber(lineNum, extracted, grid)) {
        result.push(extracted.value)
      }
    }
  }

  return result
}

type ExtractedNumbers = {
  value: number
  start: number
  end: number
}

function isPartNumber(lineNum: number, extracted: ExtractedNumbers, grid: string[]): boolean {
  for (let row = lineNum - 1; row <= lineNum + 1; ++row) {
    for (let col = extracted.start - 1; col <= extracted.end + 1; ++col) {
      const c = grid[row]?.[col]
      if (c === undefined || c === '.' || isNumber(c)) {
        continue
      }
      return true
    }
  }
  return false
}

function extractNumbers(line: string | undefined): ExtractedNumbers[] {
  if (!line) return []

  const result: ExtractedNumbers[] = []

  let current = ''
  let start = -1

  for (let pos = 0; pos < line.length; ++pos) {
    const c = line[pos]
    if (!isNumber(c)) {
      if (current) {
        result.push({ value: parseInt(current), start, end: pos - 1 })
        current = ''
        start = -1
      }
      continue
    }
    current += c
    if (start === -1) start = pos
  }

  if (current) {
    result.push({ value: parseInt(current), start, end: line.length - 1 })
  }

  console.log(result)
  return result
}

function isNumber(c: string | undefined): boolean {
  if (!c) return false
  const parsed = parseInt(c)
  if (Number.isNaN(parsed)) {
    return false
  }
  return true
}
