import { Solver } from '../exercise/index.js'
import { findWaysWithKerning } from './find-ways-with-kerning.js'
import { multiplyWays } from './multiply-ways.js'

const input = (): [string, string] => ['Time:        45     98     83     73', 'Distance:   295   1734   1278   1210']

export class DaySolver implements Solver {
  step01(): unknown {
    return multiplyWays(input())
  }
  step02(): unknown {
    return findWaysWithKerning(input())
  }
}
