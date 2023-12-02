import { Game } from './game'

describe('Game', () => {
  it('should parse its id', () => {
    const game = new Game('Game 259: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue')
    expect(game.getId()).toBe(259)
  })

  it('should find the max of each number', () => {
    const game = new Game('Game 259: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue')
    expect(game.getMaxima()).toStrictEqual({ blue: 4, green: 3, red: 1 })
  })

  it.each([
    {
      input: 'Game 259: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue',
      threshold: { blue: 4, red: 4, green: 4 },
      valid: true,
    },
    {
      input: 'Game 259: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue',
      threshold: { blue: 0, red: 4, green: 4 },
      valid: false,
    },
    {
      input: 'Game 259: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue',
      threshold: { blue: 4, red: 0, green: 4 },
      valid: false,
    },
    {
      input: 'Game 259: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue',
      threshold: { blue: 4, red: 4, green: 0 },
      valid: false,
    },
  ])('should be valid if it respects threshold', ({ input, threshold, valid }) => {
    const game = new Game(input)

    expect(game.isRespecting(threshold)).toBe(valid)
  })
})
