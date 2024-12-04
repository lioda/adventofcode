import { Lines } from '../exercise/line-reader.js'
import { parseHand, parseHandWithJokers } from './parse-hand.js'

const cards = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'] as const
const cardValues = [...cards].reverse().reduce((acc, card, i) => ({ ...acc, [card]: i }), {} as Record<string, number>)

export async function camelCardsTotalWinning(lines: Lines): Promise<number> {
  const hands = await lines.map((line) => {
    const splitted = line.split(' ')
    const hand = splitted[0]!
    const bid = parseInt(splitted[1]!)
    return { bid, ...parseHand(hand) }
  })

  const result = hands
    .sort((hand1, hand2) => {
      if (hand1.type === hand2.type) {
        return compareHandValues(hand1.hand, hand2.hand)
      }
      return hand1.type > hand2.type ? 1 : -1
    })
    .map((hand, idx) => {
      const rank = idx + 1
      return rank * hand.bid
    })
    .reduce((a, b) => a + b, 0)

  return result
}

function compareHandValues(hand1: string, hand2: string): number {
  for (let i = 0; i < 5; ++i) {
    const card1 = cardValues[hand1[i]!]!
    const card2 = cardValues[hand2[i]!]!
    if (card1 !== card2) {
      return card1 > card2 ? 1 : -1
    }
  }
  return 0
}

const cardsWithLowJokers = ['A', 'K', 'Q', 'T', '9', '8', '7', '6', '5', '4', '3', '2', 'J'] as const
const cardValuesWithLowJokers = [...cardsWithLowJokers].reverse().reduce((acc, card, i) => ({ ...acc, [card]: i }), {} as Record<string, number>)
export async function camelCardsWithJokersTotalWinning(lines: Lines): Promise<number> {
  const hands = await lines.map((line) => {
    const splitted = line.split(' ')
    const hand = splitted[0]!
    const bid = parseInt(splitted[1]!)
    return { bid, ...parseHandWithJokers(hand) }
  })

  const result = hands
    .sort((hand1, hand2) => {
      if (hand1.type === hand2.type) {
        return compareHandValuesWithLowJokers(hand1.hand, hand2.hand)
      }
      return hand1.type > hand2.type ? 1 : -1
    })
    .map((hand, idx) => {
      const rank = idx + 1
      return rank * hand.bid
    })
    .reduce((a, b) => a + b, 0)

  return result
}
function compareHandValuesWithLowJokers(hand1: string, hand2: string): number {
  for (let i = 0; i < 5; ++i) {
    const card1 = cardValuesWithLowJokers[hand1[i]!]!
    const card2 = cardValuesWithLowJokers[hand2[i]!]!
    if (card1 !== card2) {
      return card1 > card2 ? 1 : -1
    }
  }
  return 0
}
