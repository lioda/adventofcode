const validateIncrease = (a: number, b: number) => {
  const dist = a - b
  return dist > 0 && dist <= 3
}
const validateDecrease = (a: number, b: number) => {
  const dist = b - a
  return dist > 0 && dist <= 3
}

export class SafeReport {
  static parse(line: string): SafeReport | undefined {
    const nums = line.split(' ').map((s) => parseInt(s))

    const isNumberValid = (nums[0] ?? 0) < (nums[1] ?? 0) ? validateIncrease : validateDecrease
    if (
      !nums.every((n, i, arr) => {
        const prev = arr[i - 1]
        if (!prev) return true

        return isNumberValid(n, prev)
      })
    )
      return undefined

    return new SafeReport(nums)
  }

  private constructor(public readonly nums: number[]) {}
}
