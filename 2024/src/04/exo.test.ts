import { CharacterMatrix, step01 } from './exo'

describe('CharacterMatrix', () => {
  it('should retrieve words from a position', () => {
    const matrix = new CharacterMatrix([
      'MMMSXXMASM',
      'MSAMXMSMSA',
      'AM2S4M6AMM',
      'MSA135MSMX',
      'XMFE078AMM',
      'XXACA9XAMA',
      'SMDMBA0XSS',
      'SAXAMASAAA',
      'MAMMMXMMMM',
      'MXMXAXMASX',
    ])
    const words = matrix.wordsFrom({ line: 4, column: 4, length: 3 }) // position of 0

    expect(words.sort()).toStrictEqual(['012', '034', '056', '078', '090', '0AB', '0CD', '0EF'].sort())
  })
  it('should retrieve cut words at edge', () => {
    const matrix = new CharacterMatrix([
      '0123456789', //
      '2345678901',
      '4567890123',
      '6789012345',
    ])

    expect(matrix.wordsFrom({ line: 0, column: 0, length: 2 }).sort()).toStrictEqual(['01', '02', '03'])
    expect(matrix.wordsFrom({ line: 0, column: 9, length: 2 }).sort()).toStrictEqual(['90', '91', '98'])
    expect(matrix.wordsFrom({ line: 3, column: 0, length: 2 }).sort()).toStrictEqual(['64', '65', '67'])
    expect(matrix.wordsFrom({ line: 3, column: 9, length: 2 }).sort()).toStrictEqual(['52', '53', '54'])
  })
  it('should map each value with result of fn(pos)', () => {
    const matrix = new CharacterMatrix(['012', '123', '234', '345', '456'])
    const mapped = matrix.mapEach('3', (pos) => pos)

    expect(mapped).toStrictEqual([
      { line: 1, column: 2 },
      { line: 2, column: 1 },
      { line: 3, column: 0 },
    ])
  })
})

describe('step01', () => {
  it('should solves matrix', () => {
    expect(
      step01([
        'MMMSXXMASM',
        'MSAMXMSMSA',
        'AMXSXMAAMM',
        'MSAMASMSMX',
        'XMASAMXAMM',
        'XXAMMXXAMA',
        'SMSMSASXSS',
        'SAXAMASAAA',
        'MAMMMXMMMM',
        'MXMXAXMASX',
      ]),
    ).toBe(18)
  })
})
