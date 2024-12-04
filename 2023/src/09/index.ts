import { Solver, TextFileLines } from '../exercise/index.js'
import { History } from './history.js'

export class DaySolver implements Solver {
  step01(): unknown {
    const input = new TextFileLines('src/09/input.txt')
    return input
      .map((line) => History.parse(line))
      .then((histories) => histories.map((history) => history.extrapolateNextNumber()).reduce((a, b) => a + b))
  }
  step02(): unknown {
    const input = new TextFileLines('src/09/input.txt')
    return input
      .map((line) => History.parse(line))
      .then((histories) => histories.map((history) => history.extrapolatePreviousNumber()).reduce((a, b) => a + b))
  }
}
