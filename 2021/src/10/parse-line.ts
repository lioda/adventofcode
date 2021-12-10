type IllegalCharacter = ")" | "]" | "}" | ">";

const opens = ["(", "[", "{", "<"];
const matchingCloses: Record<string, IllegalCharacter> = {
  "(": ")",
  "{": "}",
  "[": "]",
  "<": ">",
};

const scores: Record<IllegalCharacter, number> = {
  ")": 1,
  "]": 2,
  "}": 3,
  ">": 4,
};

export function findFirstIllegalCharacter(
  line: string
): IllegalCharacter | undefined {
  const stack: string[] = [];
  for (const c of line) {
    if (opens.includes(c)) {
      stack.push(c);
      continue;
    }
    const lastOpen = stack.pop()!;
    const matchingClose = matchingCloses[lastOpen];
    if (c !== matchingClose) {
      return c as IllegalCharacter;
    }
  }
  return undefined;
}

export function scoreCorruptedLines(lines: string[]): number {
  const scores: Record<IllegalCharacter, number> = {
    ")": 3,
    "]": 57,
    "}": 1197,
    ">": 25137,
  };
  return lines.reduce((score, line) => {
    const illegalChar = findFirstIllegalCharacter(line);
    if (!illegalChar) {
      return score;
    }
    return score + scores[illegalChar];
  }, 0);
}

export function completeLine(line: string): {
  completion: string;
  score: number;
} {
  const stack: string[] = [];
  for (const c of line) {
    if (opens.includes(c)) {
      stack.push(c);
      continue;
    }
    stack.pop()!;
  }
  const completion = stack.map((open) => matchingCloses[open]).reverse();

  const score = completion
    .map((c) => scores[c])
    .reduce((score, n) => score * 5 + n, 0);

  return { completion: completion.join(""), score };
}

export function middleCompleteScore(lines: string[]): number {
  const scores: number[] = [];
  for (const line of lines) {
    const isCorrupted = !!findFirstIllegalCharacter(line);
    if (isCorrupted) {
      continue;
    }
    const { score } = completeLine(line);
    scores.push(score);
  }

  scores.sort((a, b) => a - b);
  return scores[Math.floor(scores.length / 2)];
}
