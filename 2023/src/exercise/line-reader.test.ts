import { TextFileLines } from './line-reader'

describe('TextFileLines', () => {
  it('should map each line', async () => {
    const lines = new TextFileLines('src/exercise/text.txt')

    const result = await lines.map((s) => s.length)

    expect(result).toStrictEqual([3, 4])
  })
})
