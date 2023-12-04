import { Lines } from '../exercise/line-reader.js'
import { Card } from './card.js'

export class Cards {
  constructor(private readonly input: Lines) {}

  public async sumOfValues(): Promise<number> {
    const cards = await this.input.map((line) => new Card(line))

    return cards.map((c) => c.getValue()).reduce((a, b) => a + b, 0)
  }

  public async countCards(): Promise<number> {
    const cards = await this.input.map((line) => ({ card: new Card(line), count: 1 }))

    for (let pos = 0; pos < cards.length; ++pos) {
      const cardItem = cards[pos]!

      const winningNumbers = cardItem.card.countWinningNumbers()
      for (let i = 0; i < winningNumbers; ++i) {
        cards[pos + 1 + i]!.count += cardItem.count
      }
    }

    return cards.map((item) => item.count).reduce((a, b) => a + b, 0)
  }
}
