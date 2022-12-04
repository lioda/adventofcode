type Result01 = { contained: number };

export function exo01(pairs: string[]): Result01 {
  let contained = 0;
  for (const pair of pairs) {
    const [elve1, elve2] = pair.split(",");
    const [start1, end1] = elve1.split("-").map((x) => parseInt(x, 10));
    const [start2, end2] = elve2.split("-").map((x) => parseInt(x, 10));
    if (
      (start1 <= start2 && end1 >= end2) ||
      (start2 <= start1 && end2 >= end1)
    ) {
      contained += 1;
    }
  }
  return { contained };
}

type Result02 = { overlapped: number };
export function exo02(pairs: string[]): Result02 {
  let overlapped = 0;
  for (const pair of pairs) {
    const [elve1, elve2] = pair.split(",");
    const section1 = elve1.split("-").map((x) => parseInt(x, 10));
    const section2 = elve2.split("-").map((x) => parseInt(x, 10));
    let first;
    let second;
    if (section1[0] < section2[0]) {
      first = section1;
      second = section2;
    } else {
      first = section2;
      second = section1;
    }
    if (first[1] >= second[0]) {
      overlapped += 1;
    }
  }
  return { overlapped };
}
