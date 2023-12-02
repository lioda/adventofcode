import { Solver, TextFileLines } from '../exercise/index.js'
import { Exo02 } from './exo.js'

export class Solver02 implements Solver {
  step01(): unknown {
    const input = new TextFileLines('src/02/input.txt')
    const exo = new Exo02(input)

    return exo.sumOfValid({ red: 12, green: 13, blue: 14 })
  }
}
