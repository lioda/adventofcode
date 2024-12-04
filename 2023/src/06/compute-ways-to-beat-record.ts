export function computeWaysToBeatRecord(time: number, record: number): number {
  const first = findFirstRecordBeating(time, record)
  const last = findLastRecordBeating(time, record)
  return last - first + 1
}

function findFirstRecordBeating(time: number, record: number): number {
  for (let i = 0; i <= time; ++i) {
    const speed = i
    const remainingTime = time - i

    const distance = speed * remainingTime

    if (distance > record) {
      return i
    }
  }
  return 0
}
function findLastRecordBeating(time: number, record: number): number {
  for (let i = time; i >= 0; --i) {
    const speed = i
    const remainingTime = time - i

    const distance = speed * remainingTime

    if (distance > record) {
      return i
    }
  }
  return 0
}
