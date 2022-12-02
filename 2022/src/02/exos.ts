type Score = number;

type Choose = "rock" | "paper" | "scissor";
const opponentCode = ["A", "B", "C"] as const;
type MappingOpponent = Record<typeof opponentCode[number], Choose>;
const meCode = ["X", "Y", "Z"] as const;
type MappingMe = Record<typeof meCode[number], Choose>;

const selectionScores: Record<Choose, number> = {
  rock: 1,
  paper: 2,
  scissor: 3,
};

const outcomes = ["win", "loose", "draw"] as const;
type Outcome = typeof outcomes[number];
const wins: Record<Choose, Choose> = {
  paper: "scissor",
  rock: "paper",
  scissor: "rock",
};
const looses: Record<Choose, Choose> = {
  paper: "rock",
  rock: "scissor",
  scissor: "paper",
};

const outcomeScores: Record<Outcome, Score> = {
  draw: 3,
  loose: 0,
  win: 6,
};

export function exo01(lines: string[]): Score {
  const mappingOpponent: MappingOpponent = {
    A: "rock",
    B: "paper",
    C: "scissor",
  };
  const mappingMe: MappingMe = {
    X: "rock",
    Y: "paper",
    Z: "scissor",
  };

  return lines
    .map((line) => computeScoreLine(line, mappingOpponent, mappingMe))
    .reduce((sum, score) => sum + score, 0);
}

function computeScoreLine(
  line: string,
  mappingOpponent: MappingOpponent,
  mappingMe: MappingMe
): Score {
  const { chooseMe, chooseOpponent } = parseLine(
    line,
    mappingOpponent,
    mappingMe
  );

  const selectionScore = selectionScores[chooseMe];
  const outcomeScore = outcomeScores[computeOutcome(chooseMe, chooseOpponent)];
  return selectionScore + outcomeScore;
}

function computeOutcome(me: Choose, opponent: Choose): Outcome {
  if (me === opponent) return "draw";
  if (me === wins[opponent]) return "win";
  return "loose";
}

function parseLine(
  line: string,
  mappingOpponent: MappingOpponent,
  mappingMe: MappingMe
) {
  const [a, b] = line.split(" ");
  if (!toOpponent(a) || !toMe(b)) {
    throw new Error(`bad line ${line}, ${a} / ${b}`);
  }
  const chooseOpponent = mappingOpponent[a];
  const chooseMe = mappingMe[b];
  return { chooseMe, chooseOpponent };
}

function toOpponent(s: string): s is typeof opponentCode[number] {
  return opponentCode.map((e) => e.toString()).includes(s);
}
function toMe(s: string): s is typeof meCode[number] {
  return meCode.map((e) => e.toString()).includes(s);
}
type MappingNeededOutcome = Record<typeof meCode[number], Outcome>;

export function exo02(lines: string[]): Score {
  const mappingOpponent: MappingOpponent = {
    A: "rock",
    B: "paper",
    C: "scissor",
  };

  const neededOutcomeByCode: MappingNeededOutcome = {
    X: "loose",
    Y: "draw",
    Z: "win",
  };
  return lines
    .map((line) =>
      parseLineNeededOutcome(line, mappingOpponent, neededOutcomeByCode)
    )
    .map((item) => computeNeededScore(item))
    .reduce((sum, item) => sum + item, 0);
}

function parseLineNeededOutcome(
  line: string,
  mappingOpponent: MappingOpponent,
  needed: MappingNeededOutcome
): [Choose, Outcome] {
  const [a, b] = line.split(" ");
  if (!toOpponent(a) || !toMe(b)) {
    throw new Error(`bad line ${line}, ${a} / ${b}`);
  }
  const chooseOpponent = mappingOpponent[a];
  const need = needed[b];
  return [chooseOpponent, need];
}

function computeNeededScore([opponentChoice, neededOutcome]: [
  Choose,
  Outcome
]): any {
  const neededChoice = computeNeededChoice(opponentChoice, neededOutcome);
  const selectionScore = selectionScores[neededChoice];
  return selectionScore + outcomeScores[neededOutcome];
}

function computeNeededChoice(
  opponentChoice: Choose,
  neededOutcome: Outcome
): Choose {
  if (neededOutcome === "draw") return opponentChoice;
  else if (neededOutcome === "loose") return looses[opponentChoice];
  else return wins[opponentChoice];
}
