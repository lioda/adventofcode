import { SafeReport } from './exo'

describe('Exo', () => {
  describe('SafeReport', () => {
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
})
