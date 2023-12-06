import { computeWaysToBeatRecord } from './compute-ways-to-beat-record'

describe('computeWaysToBeatRecord', () => {
  it.each([
    { time: 7, record: 9, expected: 4 },
    { time: 15, record: 40, expected: 8 },
    { time: 30, record: 200, expected: 9 },
  ])('should compute $expected for a race of $time allowed and a record of $record', ({ time, record, expected }) => {
    expect(computeWaysToBeatRecord(time, record)).toBe(expected)
  })
})
