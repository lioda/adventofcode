const mapper = /(?<source>[a-z]+)-to-(?<destination>[a-z]+) map:/

type Mapper = { source: string; destination: string; ranges: MappingRange[] }
type Mappers = { [source: string]: Mapper }

export class Transformers {
  private readonly mappers: Mappers = {}

  constructor(lines: string[]) {
    let currentMapper: Mapper | undefined = undefined

    for (const line of lines) {
      if (!line && currentMapper) {
        this.mappers[currentMapper.source] = currentMapper
        currentMapper = undefined
        continue
      }
      if (line.match(mapper)) {
        const groups = mapper.exec(line)!.groups!
        const source = groups['source']!
        const destination = groups['destination']!

        currentMapper = {
          source,
          destination,
          ranges: [],
        }
      } else {
        const rangeDef = line.split(' ').map((s) => parseInt(s))
        const range = new MappingRange(rangeDef[0]!, rangeDef[1]!, rangeDef[2]!)
        currentMapper?.ranges.push(range)
      }
    }

    if (currentMapper) {
      this.mappers[currentMapper.source] = currentMapper
    }
  }

  public findLocation(seed: number): number {
    let valueToMap = seed
    let step = 'seed'
    while (step != 'location') {
      const mapper = this.mappers[step]
      if (!mapper) {
        return -1
      }

      const range = mapper.ranges.find((range) => range.applyTo(valueToMap))

      if (range) {
        valueToMap = range.apply(valueToMap)
      }

      step = mapper.destination
    }

    return valueToMap
  }
}

class MappingRange {
  constructor(private readonly destination: number, private readonly source: number, private readonly length: number) {}

  public applyTo(source: number): boolean {
    return source >= this.source && source < this.source + this.length
  }

  public apply(source: number): number {
    const shift = source - this.source
    return this.destination + shift
  }
}
