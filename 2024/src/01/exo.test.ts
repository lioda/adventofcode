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

      const result = await exo.combine(input(['3   4', '4   3', '2   5', '1   3', '3   9', '3   3']))

      expect(result).toBe(11)
    })
  })
  describe.skip('part 02', () => {
    it.each([
      { inputString: 'two1nine', expected: 29 },
      { inputString: 'eightwothree', expected: 83 },
      { inputString: 'abcone2threexyz', expected: 13 },
      { inputString: 'xtwone3four', expected: 24 },
      { inputString: '4nineeightseven2', expected: 42 },
      { inputString: 'zoneight234', expected: 14 },
      { inputString: '7pqrstsixteen', expected: 76 },
      { inputString: 'zfxbzhczcx9eightwockk', expected: 92 },
    ])('when $inputString letters then use numbers in full letters', async ({ inputString, expected }) => {
      const exo = new Exo01()

      const result = await exo.combine(input([inputString]))

      expect(result).toBe(expected)
    })

    it('when a number is written in full letters then use it', async () => {
      const exo = new Exo01()

      const result = await exo.combine(
        input(['two1nine', 'eightwothree', 'abcone2threexyz', 'xtwone3four', '4nineeightseven2', 'zoneight234', '7pqrstsixteen']),
      )

      expect(result).toBe(281)
    })
  })
})
