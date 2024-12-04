import { Solver, TextFileLines } from '../exercise/index.js'
import { lowestLocation, lowestRange } from './lowest.js'

export class DaySolver implements Solver {
  async step01(): Promise<unknown> {
    const lines = new TextFileLines('src/05/input.txt')
    const input = await lines.map((l) => l)

    return lowestLocation(input)
  }
  async step02(): Promise<unknown> {
    const lines = new TextFileLines('src/05/input.txt')
    const input = await lines.map((l) => l)

    return lowestRange(input)
  }
}
