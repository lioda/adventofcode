import { Lines } from '../exercise/line-reader'

import { Exo01 } from './exo'

describe('Exo01', () => {
  function input(strings: string[]): Lines {
    return {
      map: (mapper) => Promise.resolve(strings.map(mapper)),
    }
  }

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
