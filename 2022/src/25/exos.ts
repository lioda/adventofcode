export function fromSnafu(s: string): number {
  const digits = s.split("").reverse();
  let result = 0;
  for (let i = 0; i < digits.length; ++i) {
    const digit = digits[i];
    const exponent = Math.pow(5, i);

    let value;
    if (digit === "-") {
      value = exponent * -1;
    } else if (digit === "=") {
      value = exponent * -2;
    } else {
      value = exponent * parseInt(digit, 10);
    }

    result += value;
  }
  return result;
}

type SnafuDigit = 0 | 1 | 2 | "-" | "=";

export function toSnafu(input: number): string {
  let rest = input;
  let result: SnafuDigit[] = [];

  for (let i = 440; i >= 0; --i) {
    const exponent = Math.pow(5, i);
    const value = Math.floor(rest / exponent);
    rest -= value * exponent;

    if (value === 0 || value === 1 || value === 2) {
      result.push(value);
    } else if (value === 4) {
      applyCarry(result);
      result.push("-");
    } else {
      applyCarry(result);
      result.push("=");
    }
  }

  return toString(result);
}

function toString(result: SnafuDigit[]): string {
  return result.reduce((acc, digit) => {
    if (digit === 0 && acc.length === 0) {
      return acc;
    }
    return (acc += digit);
  }, "");
}

function applyCarry(digits: SnafuDigit[]) {
  let carry = 1;
  let i = digits.length - 1;
  while (carry > 0 && i >= 0) {
    const digit = digits[i];
    if (digit === 0) {
      digits[i] = 1;
      carry = 0;
    } else if (digit === 1) {
      digits[i] = 2;
      carry = 0;
    } else if (digit === 2) {
      digits[i] = "=";
    } else if (digit === "=") {
      digits[i] = "-";
      carry = 0;
    } else if (digit === "-") {
      digits[i] = 0;
      carry = 0;
    }
    --i;
  }
}

export function exo01(input: string[]): string {
  let add = 0;
  for (const line of input) {
    const addee = fromSnafu(line);
    add += addee;
  }

  return toSnafu(add);
}
