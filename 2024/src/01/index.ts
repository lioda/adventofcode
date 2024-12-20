import { Solver, TextFileLines } from '../exercise/index'
import { Exo01 } from './exo'

export class Solver01 implements Solver {
  private readonly exo = new Exo01()
  private readonly input = new TextFileLines('src/01/input.txt')

  step01(): Promise<unknown> {
    return this.exo.distance(this.input)
  }

  step02(): Promise<unknown> {
    return this.exo.similarity(this.input)
  }
}
