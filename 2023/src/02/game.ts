import { Maxima } from './maxima.js'

const regex = /^Game (?<id>[0-9]+):/

export class Game {
  private readonly id: number
  private readonly maxima: Maxima
  constructor(desc: string) {
    const parsed = regex.exec(desc)
    this.id = parseInt(parsed?.groups?.['id'] ?? '-1')

    this.maxima = { blue: 0, green: 0, red: 0 }
    const sets = desc.split(': ')[1]?.split('; ') ?? []
    for (const set of sets) {
      const colors = set.split(', ')
      for (const color of colors) {
        const [num, rgb] = color.split(' ')
        this.maxima[rgb as keyof Maxima] = Math.max(parseInt(num ?? ''), this.maxima[rgb as keyof Maxima])
      }
    }
  }

  getId(): number {
    return this.id
  }

  getMaxima(): Maxima {
    return this.maxima
  }

  isRespecting(threshold: Maxima): boolean {
    return this.maxima.blue <= threshold.blue && this.maxima.green <= threshold.green && this.maxima.red <= threshold.red
  }
}
