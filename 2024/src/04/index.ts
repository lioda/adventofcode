import { Solver, TextFileLines } from '../exercise/index'
import { step01, step02 } from './exo'

export class SolverN implements Solver {
  async step01(): Promise<unknown> {
    const lines = await new TextFileLines('src/04/input.txt').map((l) => l)

    return step01(lines)
  }

  async step02(): Promise<unknown> {
    const lines = await new TextFileLines('src/04/input.txt').map((l) => l)

    return step02(lines)
  }
}
