import { Transformers } from './transformers'

describe('Transformers', () => {
  const input = [
    'seed-to-soil map:',
    '50 98 2',
    '52 50 48',
    '',
    'soil-to-fertilizer map:',
    '0 15 37',
    '37 52 2',
    '39 0 15',
    '',
    'fertilizer-to-water map:',
    '49 53 8',
    '0 11 42',
    '42 0 7',
    '57 7 4',
    '',
    'water-to-light map:',
    '88 18 7',
    '18 25 70',
    '',
    'light-to-temperature map:',
    '45 77 23',
    '81 45 19',
    '68 64 13',
    '',
    'temperature-to-humidity map:',
    '0 69 1',
    '1 0 69',
    '',
    'humidity-to-location map:',
    '60 56 37',
    '56 93 4',
  ]

  it('should find location with one mapper', () => {
    const transformers = new Transformers(['seed-to-location map:', '50 98 2', '52 50 48'])

    expect(transformers.findLocation(79)).toBe(81)
    expect(transformers.findLocation(14)).toBe(14)
    expect(transformers.findLocation(55)).toBe(57)
    expect(transformers.findLocation(13)).toBe(13)
  })

  // it('should find location with many mappers', () => {
  //   const transformers = new Transformers(input)

  //   expect(transformers.findLocation(79)).toBe(81)
  //   expect(transformers.findLocation(14)).toBe(14)
  //   expect(transformers.findLocation(55)).toBe(57)
  //   expect(transformers.findLocation(13)).toBe(13)
  // })

  it.each([
    {
      seed: 79,
      expectedLocation: 82,
    },
  ])('should find location $location for seed $seed', ({ seed, expectedLocation }) => {
    const transformers = new Transformers(input)

    const actualLocation = transformers.findLocation(seed)

    expect(actualLocation).toBe(expectedLocation)
  })
})
