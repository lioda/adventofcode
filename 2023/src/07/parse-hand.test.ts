import { HandType, parseHand, parseHandWithJokers } from './parse-hand'

describe('parseHand', () => {
  it.each([
    { hand: '32T3K', handType: HandType.OnePair },
    { hand: 'KK677', handType: HandType.TwoPair },
    { hand: 'KTJJT', handType: HandType.TwoPair },
    { hand: 'T55J5', handType: HandType.ThreeOfAKind },
    { hand: 'QQQJA', handType: HandType.ThreeOfAKind },
    { hand: 'AAAAA', handType: HandType.FiveOfAKind },
    { hand: 'AA8AA', handType: HandType.FourOfAKind },
    { hand: '23332', handType: HandType.FullHouse },
    { hand: '23456', handType: HandType.HighCard },
  ])('should parse $hand to $handType', ({ hand, handType }) => {
    expect(parseHand(hand)).toStrictEqual({ type: handType, hand })
  })
})

describe('parseHandWithJokers', () => {
  it.each([
    { hand: '32T3K', handType: HandType.OnePair },
    { hand: 'KK677', handType: HandType.TwoPair },
    { hand: 'T55J5', handType: HandType.FourOfAKind },
    { hand: 'KTJJT', handType: HandType.FourOfAKind },
    { hand: 'QQQJA', handType: HandType.FourOfAKind },
    { hand: 'AAAAA', handType: HandType.FiveOfAKind },
    { hand: 'AA8AA', handType: HandType.FourOfAKind },
    { hand: '23332', handType: HandType.FullHouse },
    { hand: '23J32', handType: HandType.FullHouse },
    { hand: '23J31', handType: HandType.ThreeOfAKind },
    { hand: '23456', handType: HandType.HighCard },
    { hand: 'JJJJJ', handType: HandType.FiveOfAKind },
  ])('should parse $hand to $handType', ({ hand, handType }) => {
    expect(parseHandWithJokers(hand)).toStrictEqual({ type: handType, hand })
  })
})
