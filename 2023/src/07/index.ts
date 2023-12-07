import { Solver, TextFileLines } from '../exercise/index.js'
import { camelCardsTotalWinning } from './camelCards.js'

export class DaySolver implements Solver {
  step01(): unknown {
    const lines = new TextFileLines('src/07/input.txt')
    return camelCardsTotalWinning(lines)
  }
  step02(): unknown {
    throw new Error('Method not implemented.')
  }
}
