import { Solver, TextFileLines } from '../exercise/index'
import { SafeReport } from './exo'

export class SolverN implements Solver {
  private readonly input = new TextFileLines('src/02/input.txt')

  async step01(): Promise<unknown> {
    const safeReports = await this.input.map((l) => SafeReport.parse(l))

    return safeReports.filter((x) => !!x).length
  }

  step02(): Promise<unknown> {
    return this.exo.similarity(this.input)
  }
}
