type MaxElve = {
  maxElve: number;
  maxCalories: number;
};

export function exo01(calories: string[]): MaxElve {
  let maxElve = 0;
  let maxCalories = 0;
  let currentElve = 1;
  let currentElveCalories = 0;
  for (const line of calories) {
    if (line === "") {
      if (currentElveCalories > maxCalories) {
        maxElve = currentElve;
        maxCalories = currentElveCalories;
      }
      ++currentElve;
      currentElveCalories = 0;
      continue;
    }
    currentElveCalories += parseInt(line, 10);
  }
  if (currentElveCalories > maxCalories) {
    maxElve = currentElve;
    maxCalories = currentElveCalories;
  }
  return { maxElve, maxCalories };
}

type Result = {
  sum: number;
  top: { maxElve: number; maxCalories: number }[];
};
export function exo02(calories: string[]): Result {
  const top: [MaxElve, MaxElve, MaxElve] = [
    { maxCalories: 0, maxElve: 0 },
    { maxCalories: 0, maxElve: 0 },
    { maxCalories: 0, maxElve: 0 },
  ];

  let currentElve = 1;
  let currentElveCalories = 0;
  for (const line of calories) {
    if (line === "") {
      addToTop({ maxElve: currentElve, maxCalories: currentElveCalories }, top);
      ++currentElve;
      currentElveCalories = 0;
      continue;
    }
    currentElveCalories += parseInt(line, 10);
  }
  addToTop({ maxElve: currentElve, maxCalories: currentElveCalories }, top);

  const sum = top.reduce((sum, elve) => sum + elve.maxCalories, 0);
  return {
    sum,
    top,
  };
}

function addToTop(current: MaxElve, top: [MaxElve, MaxElve, MaxElve]) {
  if (current.maxCalories > top[0].maxCalories) {
    top[2] = top[1];
    top[1] = top[0];
    top[0] = current;
  } else if (current.maxCalories > top[1].maxCalories) {
    top[2] = top[1];
    top[1] = current;
  } else if (current.maxCalories > top[2].maxCalories) {
    top[2] = current;
  }
}
