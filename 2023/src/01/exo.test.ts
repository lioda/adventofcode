import { Lines } from '../exercise/line-reader'

import { Exo01 } from './exo'

describe('Exo01', () => {
  function input(strings: string[]): Lines {
    return {
      map: (mapper) => Promise.resolve(strings.map(mapper)),
    }
  }
  describe('part 1', () => {
    it('when digits are first and last characters then combine them', async () => {
      const exo = new Exo01()

      const result = await exo.combine(input(['1abc2']))

      expect(result).toBe(12)
    })

    it('when digits are spread in the string then combine them', async () => {
      const exo = new Exo01()

      const result = await exo.combine(input(['pqr3stu8vwx']))

      expect(result).toBe(38)
    })

    it('when there are many digits then keep only first and last', async () => {
      const exo = new Exo01()

      const result = await exo.combine(input(['a1b2c3d4e5f']))

      expect(result).toBe(15)
    })

    it('when there is only one digit then it is both first and last', async () => {
      const exo = new Exo01()

      const result = await exo.combine(input(['treb7uchet']))

      expect(result).toBe(77)
    })

    it('when there are many strings then add all values', async () => {
      const exo = new Exo01()

      const result = await exo.combine(input(['1abc2', 'pqr3stu8vwx', 'a1b2c3d4e5f', 'treb7uchet']))

      expect(result).toBe(142)
    })
  })
  describe('part 02', () => {
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
