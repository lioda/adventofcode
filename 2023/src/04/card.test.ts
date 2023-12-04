import { Card } from './card'

describe('Card', () => {
  it('compute value 1 when 1 winning number', () => {
    const card = new Card('Card 1: 41 48 83 86 17 | 82 86  6 31 14  9 46 53')

    expect(card.getValue()).toBe(1)
  })

  it('double card value1 for each winning number', () => {
    const card = new Card('Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53')

    expect(card.getValue()).toBe(8)
  })

  it('compute value 0 when no winning number', () => {
    const card = new Card('Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36')

    expect(card.getValue()).toBe(0)
  })
})
