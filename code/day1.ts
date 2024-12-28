import { getInputFor } from "../utils/get-input.ts";

const data = getInputFor(
  1,
  (x) =>
    x
      .split("\n")
      .map((d) =>
        d
          .split(" ")
          .filter((x) => x)
          .map(Number)
      )
      .reduce(
        (a, b) => {
          a[0].push(b[0]);
          a[1].push(b[1]);
          return a;
        },
        [[], []] as [number[], number[]]
      )
);

function d11(data: [number[], number[]]) {
  const [x, y] = data.map((x) => x.toSorted((a, b) => a - b));
  let diff = 0;
  for (let i = 0; i < x.length; i++) {
    diff += Math.abs(x[i] - y[i]);
  }
  return diff;
}

function d12(data: [number[], number[]]) {
  const [x, y] = data;
  let result = 0;
  const counter: Record<number, number> = {}
  for (let i = 0; i < y.length; i++) {
    counter[y[i]] = (counter[y[i]] ?? 0) + 1;
  }
  for (let i = 0; i < x.length; i++) {
    if (counter[x[i]] === 0 || counter[x[i]] === undefined) {
      continue;
    }
    result += counter[x[i]] * x[i];
  }
  return result
}

console.log(d11(data));
console.log(d12(data));

