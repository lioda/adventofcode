type Position = { x: number; y: number };
type MemoizedPosition = string;

type Command = { direction: "U" | "D" | "R" | "L"; value: number };

export function exo01(commands: string[]): number {
  let head: Position = { x: 0, y: 0 };
  let tail: Position = { x: 0, y: 0 };

  const uniqPositions = new Set<MemoizedPosition>();

  for (const commandStr of commands) {
    const command = parse(commandStr);
    const { newHead, tailPositions } = applyCommand(command, head, tail);
    head = newHead;
    tail = tailPositions.at(-1)!;
    addNotKnownPositions(tailPositions, uniqPositions);
  }

  return uniqPositions.size;
}

export function parse(line: string): Command {
  const [direction, value] = line.split(" ");
  return {
    direction: direction as Command["direction"],
    value: parseInt(value, 10),
  };
}

function applyCommand(
  command: Command,
  head: Position,
  tail: Position
): { newHead: Position; tailPositions: Position[] } {
  let newHead: Position = head;
  let currentTail: Position = tail;
  const tailPositions: Position[] = [];
  for (let i = 0; i < command.value; ++i) {
    newHead = applyDirection(newHead, command.direction);
    const newTail = applyTailMovement(newHead, currentTail);
    currentTail = newTail;
    tailPositions.push(newTail);
  }
  return { newHead, tailPositions };
}

function addNotKnownPositions(
  tailPositions: Position[],
  uniqPositions: Set<MemoizedPosition>
) {
  tailPositions
    .map((item): MemoizedPosition => `${item.x}-${item.y}`)
    .forEach((item) => uniqPositions.add(item));
}

export function applyDirection(
  { x, y }: Position,
  direction: Command["direction"]
): Position {
  switch (direction) {
    case "D":
      return { x, y: y - 1 };
    case "U":
      return { x, y: y + 1 };
    case "L":
      return { x: x - 1, y };
    case "R":
      return { x: x + 1, y };
  }
}

export function applyTailMovement(
  head: Position,
  currentTail: Position
): Position {
  const distanceX = Math.abs(head.x - currentTail.x);
  const distanceY = Math.abs(head.y - currentTail.y);
  const distance = distanceX + distanceY;
  if (distance <= 1 || (distanceX === 1 && distanceY === 1)) {
    //touching
    return currentTail;
  }
  if (distanceX === 0 && distanceY === 2) {
    // 1 step by Y
    const direction = head.y - currentTail.y > 0 ? 1 : -1;
    return { x: currentTail.x, y: currentTail.y + 1 * direction };
  }
  if (distanceX === 2 && distanceY === 0) {
    // 1 step by X
    const direction = head.x - currentTail.x > 0 ? 1 : -1;
    return { y: currentTail.y, x: currentTail.x + 1 * direction };
  }

  const directionY = head.y - currentTail.y > 0 ? 1 : -1;
  const directionX = head.x - currentTail.x > 0 ? 1 : -1;

  return {
    x: currentTail.x + 1 * directionX,
    y: currentTail.y + 1 * directionY,
  };
}
type Tails = [
  Position,
  Position,
  Position,
  Position,
  Position,
  Position,
  Position,
  Position,
  Position
];
type TailsPositions = [
  Position[],
  Position[],
  Position[],
  Position[],
  Position[],
  Position[],
  Position[],
  Position[],
  Position[]
];
export function exo02(commands: string[]) {
  let head: Position = { x: 0, y: 0 };
  let tails: Tails = [
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ];

  const uniqPositionsOf9 = new Set<MemoizedPosition>();

  for (const commandStr of commands) {
    const command = parse(commandStr);
    const { newHead, tailsPositions } = applyCommand2(command, head, tails);
    head = newHead;
    tails = tailsPositions.map((tailPosition) => tailPosition.at(-1)!) as Tails;
    addNotKnownPositions(tailsPositions[8], uniqPositionsOf9);
  }

  return uniqPositionsOf9.size;
}

function applyCommand2(
  command: Command,
  head: Position,
  tails: Tails
): { newHead: Position; tailsPositions: TailsPositions } {
  let newHead: Position = head;
  let currentTails: Tails = [...tails];
  const tailsPositions: TailsPositions = [[], [], [], [], [], [], [], [], []];

  for (let i = 0; i < command.value; ++i) {
    newHead = applyDirection(newHead, command.direction);
    for (let i = 0; i < currentTails.length; ++i) {
      const newTail = applyTailMovement(
        i === 0 ? newHead : currentTails[i - 1],
        currentTails[i]
      );
      currentTails[i] = newTail;
      tailsPositions[i].push(newTail);
    }
  }

  return { newHead, tailsPositions };
}
