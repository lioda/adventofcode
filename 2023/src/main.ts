import { DaySolver as Solver } from './05/index.js'

export async function main() {
  const solver = new Solver()
  const result = await solver.step02()

  console.dir({ result })
}
await main()
