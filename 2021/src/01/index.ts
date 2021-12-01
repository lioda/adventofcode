import input from "./input.json";

export function exo01(measures: number[]) {
  const { count } = measures.reduce<{
    count: number;
    last: number | undefined;
  }>(
    (acc, measure) => {
      if (acc.last === undefined) {
        return { ...acc, last: measure };
      }

      return {
        count: acc.last < measure ? acc.count + 1 : acc.count,
        last: measure,
      };
    },
    { count: 0, last: undefined }
  );

  return count;
}

export function exo02(measures: number[]) {
  const { count } = measures.reduce<{
    count: number;
    lasts: number[];
  }>(
    (acc, measure) => {
      if (acc.lasts.length < 3) {
        acc.lasts.push(measure);
        return acc;
      }
      const oldSum = acc.lasts.reduce((a, b) => a + b);
      acc.lasts.push(measure);
      acc.lasts.shift();
      const currentSum = acc.lasts.reduce((a, b) => a + b);
      return {
        count: oldSum < currentSum ? acc.count + 1 : acc.count,
        lasts: acc.lasts,
      };
    },
    { count: 0, lasts: [] }
  );

  return count;
}

const result = exo02(input);
console.log(result);
