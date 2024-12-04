import { SolverN } from './02/index'

export async function main() {
  const step01 = await new SolverN().step01()
  const step02 = undefined //await new Solver().step02()

  console.dir({ step01, step02 })
}
await main()
