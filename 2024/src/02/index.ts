import { Solver, TextFileLines } from '../exercise/index'
import { Dampener, SafeReport } from './exo'

export class SolverN implements Solver {
  async step01(): Promise<unknown> {
    const input = new TextFileLines('src/02/input.txt')
    const safeReports = await input.map((l) => SafeReport.parse(l))

    return safeReports.filter((x) => !!x).length
  }

  async step02(): Promise<unknown> {
    const input = new TextFileLines('src/02/input.txt')
    const dampener = new Dampener()

    const safeReports = await input.map((l) => SafeReport.parse(l, dampener))

    return safeReports.filter((x) => !!x).length
  }
}
