import { getInputFor } from "../utils/get-input.ts";

const data = getInputFor(
  7,
  (x) =>
    x.split("\n").map((d) => {
      const result = {
        result: 0,
        operators: [] as number[],
      };
      const parts = d.split(": ");
      result.result = parseInt(parts[0].trim());
      result.operators = parts[1].split(" ").map((o) => parseInt(o.trim()));
      return result;
    }),
  "inputs"
);

const construct = (current: string, left: number[]): string[] => {
  if (left.length === 0) {
    return [current];
  }
  return [
    construct(current + "+" + left[0], left.slice(1)),
    construct(current + "*" + left[0], left.slice(1)),
  ].flat();
};
const construct2 = (current: string, left: number[]): string[] => {
  if (left.length === 0) {
    return [current];
  }
  return [
    construct2(current + "+" + left[0], left.slice(1)),
    construct2(current + "*" + left[0], left.slice(1)),
    construct2(current + "_" + left[0], left.slice(1)),
  ].flat();
};
const evaluate = (exp: string) => {
  const parts = exp.split(/([+*])/);
  let result = parseInt(parts[0]);
  for (let i = 1; i < parts.length; i += 2) {
    const operator = parts[i];
    const operand = parseInt(parts[i + 1]);
    if (operator === "+") {
      result += operand;
    } else {
      result *= operand;
    }
  }
  return result;
};

const evaluate2 = (exp: string) => {
  const parts = exp.split(/([+*_])/);
  let result = parseInt(parts[0]);
  for (let i = 1; i < parts.length; i += 2) {
    const operator = parts[i];
    const operand = parseInt(parts[i + 1]);
    if (operator === "+") {
      result += operand;
    } else if (operator === "*") {
      result *= operand;
    } else {
      result = parseInt(result + "" + operand);
    }
  }
  return result;
};

function d71() {
  const valid: number[] = [];

  for (const d of data) {
    const results = construct(d.operators[0].toString(), d.operators.slice(1));
    if (
      results.find((r) => {
        const res = evaluate(r);
        return res === d.result;
      }) !== undefined
    ) {
      valid.push(d.result);
    }
  }
  return valid.reduce((a, v) => a + v);
}

function d72() {
  const valid: number[] = [];

  for (const d of data) {
    const results = construct2(d.operators[0].toString(), d.operators.slice(1));
    if (
      results.find((r) => {
        const res = evaluate2(r);
        return res === d.result;
      }) !== undefined
    ) {
      valid.push(d.result);
    }
  }
  return valid.reduce((a, v) => a + v);
}

console.log(d71());
console.log(d72());
