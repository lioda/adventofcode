import { Solver03 as Solver } from './03/index.js'

export async function main() {
  const solver = new Solver()
  const result = await solver.step01()

  console.dir({ result })
}
await main()
