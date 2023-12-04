import { Lines } from '../exercise/line-reader.js'
import { Card } from './card.js'

export class Cards {
  constructor(private readonly input: Lines) {}

  public async sumOfValues(): Promise<number> {
    const cards = await this.input.map((line) => new Card(line))

    return cards.map((c) => c.getValue()).reduce((a, b) => a + b, 0)
  }
}
