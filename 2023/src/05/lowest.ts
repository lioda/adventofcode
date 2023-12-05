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
