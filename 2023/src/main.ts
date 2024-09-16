import { Solver } from './exercise/index.js'

export async function main(day: string, step: string) {
  console.log(`./${day}/index.js`)
  const { DaySolver } = await import(`./${day}/index.js`)
  const solver = new DaySolver() as Solver

  let result
  if (step === '1') {
    result = await solver.step01()
  } else {
    result = await solver.step02()
  }

  console.dir({ result })
}
await main(process.argv.at(-2) ?? '', process.argv.at(-1) ?? '')
