import { Solver, TextFileLines } from '../exercise/index.js'
import { camelCardsTotalWinning, camelCardsWithJokersTotalWinning } from './camelCards.js'

export class DaySolver implements Solver {
  step01(): unknown {
    const lines = new TextFileLines('src/07/input.txt')
    return camelCardsTotalWinning(lines)
  }
  step02(): unknown {
    const lines = new TextFileLines('src/07/input.txt')
    return camelCardsWithJokersTotalWinning(lines)
  }
}
