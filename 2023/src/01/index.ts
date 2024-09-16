import { Solver, TextFileLines } from '../exercise/index.js'
import { Exo01 } from './exo.js'

export class Solver01 implements Solver {
  private readonly exo = new Exo01()
  private readonly input = new TextFileLines('src/01/input.txt')

  step01(): Promise<unknown> {
    return this.exo.combine(this.input)
  }

  step02(): unknown {
    throw new Error('Method not implemented.')
  }
}
