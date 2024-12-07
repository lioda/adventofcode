import { Solver, TextFileLines } from '../exercise/index'
import { step01, step02 } from './exo'

export class SolverN implements Solver {
  async step01(): Promise<unknown> {
    const lines = await new TextFileLines('src/03/input.txt').map((l) => l)
    const input = lines.reduce(
      (acc, l) => `${acc}
${l}`,
      '',
    )
    return step01(input)
  }

  async step02(): Promise<unknown> {
    const lines = await new TextFileLines('src/03/input.txt').map((l) => l)
    const input = lines.reduce(
      (acc, l) => `${acc}
${l}`,
      '',
    )
    return step02(input)
  }
}
