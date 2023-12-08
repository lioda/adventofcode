export { Lines, TextFileLines, ArrayLines, StringLines } from './line-reader.js'

export interface Solver {
  step01(): unknown
  step02(): unknown
}
