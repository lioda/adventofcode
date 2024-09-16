import { computeWaysToBeatRecord } from './compute-ways-to-beat-record.js'

export function multiplyWays([timesInput, recordsInput]: [string, string]): number {
  const times = removePrefixAndExtractNumbers('Time:', timesInput)
  const records = removePrefixAndExtractNumbers('Distance:', recordsInput)

  let result = 1
  for (let i = 0; i < times.length; ++i) {
    const time = times[i]!
    const record = records[i]!
    const ways = computeWaysToBeatRecord(time, record)
    result *= ways
  }
  return result
}

function removePrefixAndExtractNumbers(prefix: string, input: string): number[] {
  return input
    .replace(prefix, '')
    .split(' ')
    .map((s) => parseInt(s))
    .filter((n) => !Number.isNaN(n))
}
