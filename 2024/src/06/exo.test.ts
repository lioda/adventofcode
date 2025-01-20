import { exo1, exo2 } from './exo'

describe('06', () => {
  describe('exo 1', () => {
    it('should count distinct positions of the guard', () => {
      const input = `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`.split('\n')

      const positions = exo1(input)

      expect(positions).toBe(41)
    })
  })
  describe('exo 2', () => {
    it('should count obstructions possible to end in loop', () => {
      const input = `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`.split('\n')

      const obstructions = exo2(input)

      expect(obstructions).toBe(6)
    })
  })
})
