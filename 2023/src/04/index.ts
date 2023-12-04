import { Solver, TextFileLines } from '../exercise/index.js'
import { Cards } from './cards.js'

export class Solver04 implements Solver {
  step01(): unknown {
    const input = new TextFileLines('src/04/input.txt')
    const cards = new Cards(input)

    return cards.sumOfValues()
  }
  step02(): unknown {
    throw new Error('Method not implemented.')
  }
}
