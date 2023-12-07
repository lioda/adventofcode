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

  let handType: HandType
  if (cardOccurences[0]!.count === 5) {
    handType = HandType.FiveOfAKind
  } else if (cardOccurences[0]!.count == 4) {
    handType = HandType.FourOfAKind
  } else if (cardOccurences[0]!.count == 3) {
    if (cardOccurences[1]!.count === 2) {
      handType = HandType.FullHouse
    } else {
      handType = HandType.ThreeOfAKind
    }
  } else if (cardOccurences[0]!.count === 2) {
    if (cardOccurences[1]!.count === 2) {
      handType = HandType.TwoPair
    } else {
      handType = HandType.OnePair
    }
  } else {
    handType = HandType.HighCard
  }
  return { hand, type: handType }
}
