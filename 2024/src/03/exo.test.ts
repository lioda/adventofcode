import { step01, step02 } from './exo'

describe('Exo', () => {
  describe('step01', () => {
    it('should compute mul and ad them', () => {
      const result = step01(`xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`)

      expect(result).toBe(161)
    })

    it('should compute multiline', () => {
      const result = step01(
        //
        `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))
      xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`,
      )

      expect(result).toBe(161 * 2)
    })
  })
  describe('step02', () => {
    it('should compute mul and ad them', () => {
      const result = step02(`xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`)

      expect(result).toBe(48)
    })
  })
})
