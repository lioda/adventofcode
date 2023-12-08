import { StringLines } from '../exercise/index.js'
import { DesertMap } from './map.js'

describe('Map', () => {
  it('should reach ZZZ in two steps', async () => {
    const input = `RL

    AAA = (BBB, CCC)
    BBB = (DDD, EEE)
    CCC = (ZZZ, GGG)
    DDD = (DDD, DDD)
    EEE = (EEE, EEE)
    GGG = (GGG, GGG)
    ZZZ = (ZZZ, ZZZ)`

    const map = await DesertMap.parse(new StringLines(input))

    expect(map.stepsToReach('AAA', 'ZZZ')).toBe(2)
  })

  it('should reach ZZZ in 6 steps', async () => {
    const input = `LLR

    AAA = (BBB, BBB)
    BBB = (AAA, ZZZ)
    ZZZ = (ZZZ, ZZZ)`

    const map = await DesertMap.parse(new StringLines(input))

    expect(map.stepsToReach('AAA', 'ZZZ')).toBe(6)
  })
})
