import { Solver01 as Solver } from './01/index'

export async function main() {
  const solver = new Solver()
  const result = await solver.step01()

  console.dir({ result })
}
await main()
