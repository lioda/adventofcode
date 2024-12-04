import { Lines } from '../exercise/line-reader.js'
import { Game } from './game.js'
import { Maxima } from './maxima.js'

export class Exo02 {
  constructor(private readonly lines: Lines) {}

  async sumOfValid(threshold: Maxima): Promise<number> {
    return (
      await this.lines.map((line) => {
        return new Game(line)
      })
    )
      .filter((game) => game.isRespecting(threshold))
      .reduce((acc, game) => acc + game.getId(), 0)
  }

  async sumOfPower(): Promise<number> {
    return (
      await this.lines.map((line) => {
        return new Game(line)
      })
    )
      .map((game) => game.getPower())
      .reduce((a, b) => a + b, 0)
  }
}
