const validateIncrease = (a: number, b: number) => {
  const dist = a - b
  return dist > 0 && dist <= 3
}
const validateDecrease = (a: number, b: number) => {
  const dist = b - a
  return dist > 0 && dist <= 3
}

export class SafeReport {
  static parse(line: string, dampener?: Dampener): SafeReport | undefined {
    const nums = line.split(' ').map((s) => parseInt(s))
    const values = dampener?.generate(nums) ?? [nums]

    return values.reduce<SafeReport | undefined>((safeReport, array) => safeReport ?? SafeReport.parseOne(array), undefined)
  }

  private static parseOne(array: number[]): SafeReport | undefined {
    const isNumberValid = (array[0] ?? 0) < (array[1] ?? 0) ? validateIncrease : validateDecrease
    if (
      !array.every((n, i, arr) => {
        const prev = arr[i - 1]
        if (!prev) return true

        return isNumberValid(n, prev)
      })
    )
      return undefined

    return new SafeReport(array)
  }

  private constructor(public readonly nums: number[]) {}
}

export class Dampener {
  generate(nums: number[]): number[][] {
    return [nums, ...nums.map((_, i) => this.splice(nums, i))]
  }

  private splice(array: number[], index: number): number[] {
    const result = [...array]
    result.splice(index, 1)
    return result
  }
}
