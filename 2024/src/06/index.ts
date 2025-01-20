import { Solver, TextFileLines } from '../exercise/index'
import { exo1 } from './exo'

export class SolverN implements Solver {
  async step01(): Promise<unknown> {
    const lines = await new TextFileLines('src/06/input.txt').map((l) => l)

    return exo1(lines)
  }

  async step02(): Promise<unknown> {
    return 0
  }
}
