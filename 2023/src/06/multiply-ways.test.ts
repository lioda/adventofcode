import { multiplyWays } from './multiply-ways'

describe('multiplyWays', () => {
  it('should take input and multiply ways for each race', () => {
    expect(multiplyWays(['Time:      7  15   30', 'Distance:  9  40  200'])).toBe(288)
  })
})
