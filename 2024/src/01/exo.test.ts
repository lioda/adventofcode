import { Lines } from '../exercise/line-reader'

import { Exo01 } from './exo'

describe('Exo01', () => {
  function input(strings: string[]): Lines {
    return {
      map: (mapper) => Promise.resolve(strings.map(mapper)),
    }
  }
  describe('part 1', () => {
    it('find total distance', async () => {
      const exo = new Exo01()

      const result = await exo.distance(input(['3   4', '4   3', '2   5', '1   3', '3   9', '3   3']))

      expect(result).toBe(11)
    })
  })
  describe('part 02', () => {
    it('find similarity score', async () => {
      const exo = new Exo01()

      const result = await exo.similarity(input(['3   4', '4   3', '2   5', '1   3', '3   9', '3   3']))

      expect(result).toBe(31)
    })
  })
})
