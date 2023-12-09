import { History } from './history'

describe('History', () => {
  it.each([
    { line: '0 3 6 9 12 15', expected: 18 }, //
    { line: '1 3 6 10 15 21', expected: 28 }, //
    { line: '10 13 16 21 30 45', expected: 68 }, //
    {
      line: '3 -3 -6 11 81 262 654 1429 2882 5527 10296 18955 34930 64825 120957 225074 412708 735639 1255391 2011191 2927270',
      expected: 3589626,
    }, //
  ])('extrapolateNextNumber: for $line => $expected', ({ line, expected }) => {
    const history = History.parse(line)
    expect(history.extrapolateNextNumber()).toBe(expected)
  })
})
