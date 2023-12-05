import { Solver, TextFileLines } from '../exercise/index.js'
import { lowestLocation } from './lowest.js'

export class DaySolver implements Solver {
  async step01(): Promise<unknown> {
    const lines = new TextFileLines('src/05/input.txt')
    const input = await lines.map((l) => l)

    return lowestLocation(input)
  }
  step02(): unknown {
    throw new Error('Method not implemented.')
  }
}
