import { getInputFor } from "../utils/get-input.ts";

const data = getInputFor(
  5,
  (x) => {
    const [orders, instructions] = x.split("\n\n");
    const result = {
      orders: orders
        .split("\n")
        .map((x) => x.split("|").map(Number))
        .reduce((acc, v) => {
          const [before, after] = v;
          if (!acc[after]) {
            acc[after] = new Set();
          }
          acc[after].add(before);
          return acc;
        }, {} as Record<number, Set<number>>),
      instructions: instructions
        .split("\n")
        .map((x) => x.split(",").map(Number)),
    };
    return result;
  },
  "inputs"
);
``
function d51() {
  let counter = 0;
  for (const instructions of data.instructions) {
    const orders = structuredClone(data.orders);
    let valid = true;
    for (let i = 0; i < instructions.length; i++) {
      const toPrint = instructions[i]!;
      const left = new Set(instructions.slice(i + 1));
      for (const key in orders) {
        if (orders[key].has(toPrint)) {
          orders[key].delete(toPrint);
        }
      }
      const needPrintingBefore = orders[toPrint];
      if (!needPrintingBefore) {
        continue;
      }
      if (needPrintingBefore.size <= 0) {
        continue;
      }
      if (left.size <= 0) {
        continue;
      }
      if (left.intersection(needPrintingBefore).size > 0) {
        valid = false;
        break;
      }
    }
    if (valid) {
      counter += instructions.at(Math.floor(instructions.length / 2))!;
    }
  }
  return counter;
}
``
function d52() {
  const invalid: number[][] = [];
  for (const instructions of data.instructions) {
    const orders = structuredClone(data.orders);
    let valid = true;
    for (let i = 0; i < instructions.length; i++) {
      const toPrint = instructions[i]!;
      const left = new Set(instructions.slice(i + 1));
      for (const key in orders) {
        if (orders[key].has(toPrint)) {
          orders[key].delete(toPrint);
        }
      }
      const needPrintingBefore = orders[toPrint];
      if (!needPrintingBefore) {
        continue;
      }
      if (needPrintingBefore.size <= 0) {
        continue;
      }
      if (left.size <= 0) {
        continue;
      }
      if (left.intersection(needPrintingBefore).size > 0) {
        valid = false;
        break;
      }
    }
    if (!valid) {
      invalid.push(instructions);
    }
  }

  const sort = (a: number, b: number) => {
    const y_before_x = data.orders[a]?.has(b);
    const x_before_y = data.orders[b]?.has(a);
    if (x_before_y) {
      return -1;
    }
    if (y_before_x) {
      return 1;
    }
    return 0;
  };
  return invalid
    .map((x) => x.toSorted(sort))
    .reduce((acc, v) => {
      return acc + v.at(Math.floor(v.length / 2))!;
    }, 0);
}

console.log(d51());
console.log(d52());
