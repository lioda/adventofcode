import { ArrayLines } from '../exercise/index.js'
import { camelCardsTotalWinning } from './camelCards.js'

describe('camelCards', () => {
  it('should compute total winnings', async () => {
    const result = await camelCardsTotalWinning(new ArrayLines(['32T3K 765', 'T55J5 684', 'KK677 28', 'KTJJT 220', 'QQQJA 483']))

    expect(result).toBe(6440)
  })

  it('should compute total winnings with hands with many identical cards', async () => {
    const result = await camelCardsTotalWinning(
      new ArrayLines([
        '293A8 4',
        '2J7K8 6', //
        '298AT 5', //
        '23T6J 1', //
        '23T85 2', //
        '23T8Q 3',
      ]),
    ) //

    expect(result).toBe(1 * 1 + 2 * 2 + 3 * 3 + 4 * 4 + 5 * 5 + 6 * 6)
  })
})
