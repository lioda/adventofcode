import { Transformers } from './transformers.js'

export function lowestLocation(input: string[]): number {
  const seeds = parseSeeds(input)

  const transformers = new Transformers(input)

  let lowest = Infinity
  for (const seed of seeds) {
    const location = transformers.findLocation(seed)

    lowest = Math.min(lowest, location)
  }

  return lowest
}

function parseSeeds(input: string[]): number[] {
  const line = input.shift()!
  input.shift()

  return line
    .replace('seeds: ', '')
    .split(' ')
    .filter((s) => !!s)
    .map((s) => parseInt(s))
}

export function lowestRange(input: string[]): number {
  const seeds = parseSeeds(input)
  let total = 0
  const intervals: [number, number][] = []
  for (let i = 0; i < seeds.length; i += 2) {
    const length = seeds[i + 1]!

    const rangeStart = seeds[i]!

    intervals.push([rangeStart, rangeStart + length - 1])
  }
  const mergeds = mergeOverlappingIntervals(intervals)
  for (const interval of intervals) {
    total += interval[1] - interval[0]
  }

  console.log(`${total} seeds to test`, { mergeds })
  const transformers = new Transformers(input)

  let tested = 0
  let lowest = Infinity
  for (const interval of intervals) {
    const rangeStart = interval[0]
    const rangeEnd = interval[1] + 1

    for (let seed = rangeStart; seed < rangeEnd; ++seed) {
      const location = transformers.findLocation(seed)

      lowest = Math.min(lowest, location)
      ++tested
      if (tested % 1000000 === 0) {
        console.log(`tested: ${tested} / ${total} (${(tested / total) * 100}%) => ${lowest}`)
      }
    }
  }

  return lowest
}

function mergeOverlappingIntervals(intervals: [number, number][]): [number, number][] {
  const sorted = [...intervals].sort((interval1, interval2) => interval1[0] - interval2[0])

  const result: [number, number][] = []
  let current = sorted[0]!
  for (const interval of sorted) {
    const noOverlap = current[1] < interval[0]
    if (noOverlap) {
      result.push(current)
      current = interval
    } else {
      console.log('overlap!!!')
      current[0] = Math.min(current[0], interval[0])
      current[1] = Math.max(current[1], interval[1])
    }
  }
  result.push(current)
  return result
}
