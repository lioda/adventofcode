import { Solver01 as Solver } from './01/index'

export async function main() {
  const step01 = await new Solver().step01()
  const step02 = await new Solver().step02()

  console.dir({ step01, step02 })
}
await main()
