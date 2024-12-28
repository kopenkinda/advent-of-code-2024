import { getInputFor } from "../utils/get-input.ts";

const data = getInputFor(3, (x) => x.match(/mul\(\d*\,\d*\)/g)!, "inputs");
const dataForP2 = getInputFor(3, (x) => x.match(/(mul\(\d*\,\d*\)|do\(\)|don't\(\))/g)!, 'inputs');
// const dataForP2 =
//   "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))".match(
//     /(mul\(\d*\,\d*\)|do\(\)|don't\(\))/g
//   )!;

function mul(a: number, b: number): number {
  return a * b;
}

function d31(data: string[]): number {
  return data.reduce((acc, item) => {
    const [a, b] = item.slice(4, -1).split(",").map(Number);
    return mul(a, b) + acc;
  }, 0);
}

function d32(data: string[]): number {
  let result = 0;
  let canDo = true;
  for (const op of data) {
    if (op === "do()") {
      canDo = true;
    }
    if (op === "don't()") {
      canDo = false;
    }
    if (op.startsWith("mul(")) {
      if (canDo) {
        const [a, b] = op.slice(4, -1).split(",").map(Number);
        result += mul(a, b);
      }
    }
  }
  return result
}

console.log(d31(data));
console.log(d32(dataForP2));
