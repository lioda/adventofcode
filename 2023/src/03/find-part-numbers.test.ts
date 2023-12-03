import { findPartNumbers } from './find-part-numbers'

describe('findPartNumbers', () => {
  it('should ignore number when no symbol', () => {
    const input = ['...........', '.467.......', '...........']

    const partNumbers = findPartNumbers(input)

    expect(partNumbers).toStrictEqual([])
  })

  it('should extract number when symbol is adjacent', () => {
    expect(findPartNumbers(['*..........', '.467.......', '...........'])).toStrictEqual([467])
    expect(findPartNumbers(['...........', '*467.......', '...........'])).toStrictEqual([467])
    expect(findPartNumbers(['...........', '.467*......', '...........'])).toStrictEqual([467])
    expect(findPartNumbers(['...........', '.467.......', '...*.......'])).toStrictEqual([467])
    expect(findPartNumbers(['...........', '.467......9', '.........$.'])).toStrictEqual([9])
  })

  it('should find all part numbers', () => {
    const input = [
      '467..114..',
      '...*......',
      '..35..633.',
      '......#...',
      '617*......',
      '.....+.58.',
      '..592.....',
      '......755.',
      '...$.*....',
      '.664.598..',
    ]

    const partNumbers = findPartNumbers(input)

    expect(partNumbers.reduce((a, b) => a + b, 0)).toBe(4361)
  })
})
