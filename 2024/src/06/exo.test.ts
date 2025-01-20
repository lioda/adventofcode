import { exo1 } from './exo'

describe('06', () => {
  describe('part 1', () => {
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
})
