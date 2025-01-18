import { Solver, TextFileLines } from '../exercise/index'
import { exo1, exo2 } from './exo'

export class SolverN implements Solver {
  async step01(): Promise<unknown> {
    const lines = await new TextFileLines('src/05/input.txt').map((l) => l)

    return exo1(lines)
  }

  async step02(): Promise<unknown> {
    const lines = await new TextFileLines('src/05/input.txt').map((l) => l)

    return exo2(lines)
  }
}
