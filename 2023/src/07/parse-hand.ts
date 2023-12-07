export enum HandType {
  HighCard,
  OnePair,
  TwoPair,
  ThreeOfAKind,
  FullHouse,
  FourOfAKind,
  FiveOfAKind,
}

export function parseHand(hand: string): { hand: string; type: HandType } {
  const cardOccurences = hand
    .split('')
    .reduce((acc, card) => {
      let occurence = acc.find((occ) => occ.card === card)
      if (!occurence) {
        occurence = { card, count: 0 }
        acc.push(occurence)
      }
      occurence.count += 1
      return acc
    }, [] as { card: string; count: number }[])
    .sort((o1, o2) => o2.count - o1.count)

  const handType: HandType = findHandType(cardOccurences)
  return { hand, type: handType }
}

function findHandType(cardOccurences: { card: string; count: number }[]): HandType {
  if (cardOccurences[0]!.count === 5) {
    return HandType.FiveOfAKind
  } else if (cardOccurences[0]!.count == 4) {
    return HandType.FourOfAKind
  } else if (cardOccurences[0]!.count == 3) {
    if (cardOccurences[1]!.count === 2) {
      return HandType.FullHouse
    } else {
      return HandType.ThreeOfAKind
    }
  } else if (cardOccurences[0]!.count === 2) {
    if (cardOccurences[1]!.count === 2) {
      return HandType.TwoPair
    } else {
      return HandType.OnePair
    }
  }
  return HandType.HighCard
}

const replacementCards = ['A', 'K', 'Q', 'T', '9', '8', '7', '6', '5', '4', '3', '2']

export function parseHandWithJokers(hand: string): { hand: string; type: HandType } {
  if (hand === 'JJJJ') {
    return { hand, type: HandType.FiveOfAKind }
  }
  const hasJokers = hand.includes('J')

  if (!hasJokers) {
    // console.log(`${hand} - no joker`)
    return { hand, type: findHandType(computeOccurences(hand)) }
  }

  const max = { hand, type: HandType.HighCard }
  const allReplacements = replace(hand)

  // for (let i = 0; i < jokers; ++i) {}
  for (const replacement of allReplacements) {
    //   const replaced = hand.replace('J', replacement)
    const replacedType = findHandType(computeOccurences(replacement))

    // console.log(`try with ${replacement}: ${replacement} => ${replacedType} (${max.type})`)

    if (replacedType > max.type) {
      max.type = replacedType
    }
  }

  return max
}

function replace(hand: string): string[] {
  if (!hand.includes('J')) {
    return [hand]
  }
  return replacementCards.flatMap((replacementCard) => replace(hand.replace('J', replacementCard)))
}

function computeOccurences(hand: string): { card: string; count: number }[] {
  return hand
    .split('')
    .reduce((acc, card) => {
      let occurence = acc.find((occ) => occ.card === card)
      if (!occurence) {
        occurence = { card, count: 0 }
        acc.push(occurence)
      }
      occurence.count += 1
      return acc
    }, [] as { card: string; count: number }[])
    .sort((o1, o2) => o2.count - o1.count)
}
