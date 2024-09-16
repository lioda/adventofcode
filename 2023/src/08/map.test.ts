import { StringLines } from '../exercise/index.js'
import { DesertMap } from './map.js'

describe('Map', () => {
  describe('stepsToReach', () => {
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

  describe('stepsForGhosts', () => {
    it('should end in 6 steps', async () => {
      const input = `LR

      11A = (11B, XXX)
      11B = (XXX, 11Z)
      11Z = (11B, XXX)
      22A = (22B, XXX)
      22B = (22C, 22C)
      22C = (22Z, 22Z)
      22Z = (22B, 22B)
      XXX = (XXX, XXX)`

      const map = await DesertMap.parse(new StringLines(input))

      expect(map.stepsForGhosts()).toBe(6)
    })
  })
})
