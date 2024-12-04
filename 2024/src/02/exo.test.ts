import { SafeReport, Dampener } from './exo'

describe('Exo', () => {
  describe('SafeReport without Dampener', () => {
    it.each([{ input: '1 3 6 7 9' }, { input: '2 5 6 7 8 11' }])('should be safe if all values increase with no more than 3', ({ input }) => {
      expect(SafeReport.parse(input)?.nums).toStrictEqual(input.split(' ').map((x) => parseInt(x)))
    })
    it.each([{ input: '7 6 4 2 1' }])('should be safe if all values decrease with no more than 3', ({ input }) => {
      expect(SafeReport.parse(input)?.nums).toStrictEqual(input.split(' ').map((x) => parseInt(x)))
    })

    it('should be unsafe if increase with more than 3', () => {
      expect(SafeReport.parse('1 2 7 8 9')).toBeUndefined()
    })
    it('should be unsafe if decrease with more than 3', () => {
      expect(SafeReport.parse('9 7 6 2 1')).toBeUndefined()
    })
    it('should be unsafe if alternate increase and decrease', () => {
      expect(SafeReport.parse('1 3 2 4 5')).toBeUndefined()
    })
    it('should be unsafe if two numbers are equals', () => {
      expect(SafeReport.parse('1 3 4 4 5')).toBeUndefined()
    })
  })

  describe('Dampener', () => {
    const sortArrays = (arrays: number[][]): number[][] =>
      arrays
        .map((x) => x.join(' '))
        .sort()
        .map((x) => x.split(' ').map((y) => parseInt(y)))

    it('should generate all possible values with all levels and one removed', () => {
      const dampener = new Dampener()
      const reports = dampener.generate([1, 3, 2, 4, 5])

      expect(sortArrays(reports)).toStrictEqual(
        sortArrays([
          [1, 3, 2, 4, 5],
          [3, 2, 4, 5],
          [1, 2, 4, 5],
          [1, 3, 4, 5],
          [1, 3, 2, 5],
          [1, 3, 2, 4],
        ]),
      )
    })
  })

  describe('SafeReport with Dampener', () => {
    it.each([
      { input: '7 6 4 2 1', expected: [7, 6, 4, 2, 1] },
      { input: '1 2 7 8 9', expected: undefined },
      { input: '9 7 6 2 1', expected: undefined },
      { input: '1 3 2 4 5', expected: [1, 2, 4, 5] },
      { input: '8 6 4 4 1', expected: [8, 6, 4, 1] },
      { input: '1 3 6 7 9', expected: [1, 3, 6, 7, 9] },
    ])('should be safe if one of the dampener value is safe', ({ input, expected }) => {
      expect(SafeReport.parse(input, new Dampener())?.nums).toStrictEqual(expected)
    })
  })
})
