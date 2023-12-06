import { computeWaysToBeatRecord } from './compute-ways-to-beat-record.js'

export function findWaysWithKerning([timesInput, recordsInput]: [string, string]): number {
  const time = removePrefixAndExtractNumber('Time:', timesInput)
  const record = removePrefixAndExtractNumber('Distance:', recordsInput)

  return computeWaysToBeatRecord(time, record)
}

function removePrefixAndExtractNumber(prefix: string, input: string): number {
  const numStr = input
    .replace(prefix, '')
    .split(' ')
    .filter((s) => !!s)
    .join('')
  return parseInt(numStr)
}
