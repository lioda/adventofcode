import { Solver, TextFileLines } from '../exercise/index.js'
import { DesertMap } from './map.js'

export class DaySolver implements Solver {
  step01(): unknown {
    const input = new TextFileLines('src/08/input.txt')
    return DesertMap.parse(input).then((map) => map.stepsToReach('AAA', 'ZZZ'))
  }
  step02(): unknown {
    const input = new TextFileLines('src/08/input.txt')
    return DesertMap.parse(input).then((map) => map.stepsForGhosts())
    // return DesertMap.parse(input).then((map) => map.explore(5))
    // return DesertMap.parse(input).then((map) => map.findCycle())
  }
}
