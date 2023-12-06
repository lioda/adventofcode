import { findWaysWithKerning } from './find-ways-with-kerning'

describe('multiplyWays', () => {
  it('should take input and multiply ways for each race', () => {
    expect(findWaysWithKerning(['Time:      7  15   30', 'Distance:  9  40  200'])).toBe(71503)
  })
})
