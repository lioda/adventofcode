import { step01 } from './exo'

describe('Exo', () => {
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
