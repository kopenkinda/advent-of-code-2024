import { getInputFor } from "../utils/get-input.ts";

const data = getInputFor(
  4,
  (x) => x.split("\n").map((x) => x.split("")),
  "inputs"
);

function d41(data: string[][]) {
  const word = "XMAS";
  const getLetter = (x: number, y: number) => {
    return data?.[x]?.[y] || ".";
  };
  let counter = 0;
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      const tl =
        getLetter(i - 3, j - 3) +
        getLetter(i - 2, j - 2) +
        getLetter(i - 1, j - 1) +
        getLetter(i, j);
      const t =
        getLetter(i - 3, j) +
        getLetter(i - 2, j) +
        getLetter(i - 1, j) +
        getLetter(i, j);
      const tr =
        getLetter(i - 3, j + 3) +
        getLetter(i - 2, j + 2) +
        getLetter(i - 1, j + 1) +
        getLetter(i, j);
      const r =
        getLetter(i, j + 3) +
        getLetter(i, j + 2) +
        getLetter(i, j + 1) +
        getLetter(i, j);
      const br =
        getLetter(i + 3, j + 3) +
        getLetter(i + 2, j + 2) +
        getLetter(i + 1, j + 1) +
        getLetter(i, j);
      const b =
        getLetter(i + 3, j) +
        getLetter(i + 2, j) +
        getLetter(i + 1, j) +
        getLetter(i, j);
      const bl =
        getLetter(i + 3, j - 3) +
        getLetter(i + 2, j - 2) +
        getLetter(i + 1, j - 1) +
        getLetter(i, j);
      const l =
        getLetter(i, j - 3) +
        getLetter(i, j - 2) +
        getLetter(i, j - 1) +
        getLetter(i, j);
      const words = [tl, t, tr, r, br, b, bl, l].filter((x) => x === word);
      counter += words.length;
    }
  }
  return counter;
}

function d42(data: string[][]) {
  const getLetter = (x: number, y: number) => {
    return data?.[x]?.[y] || ".";
  };
  const getWord = (x: number[], y: number[]) => {
    return x.map((x, i) => getLetter(x, y[i])).join("");
  };
  const words = ["MAS", "SAM"];
  const isMas = (word: string) => words.includes(word);
  const X_MAS = (x: number, y: number) => {
    const tl = getWord([x - 1, x, x + 1], [y - 1, y, y + 1]);
    const tr = getWord([x + 1, x, x - 1], [y - 1, y, y + 1]);
    if (isMas(tl) && isMas(tr)) {
      return 1;
    }
    return 0;
  };
  let counter = 0;
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      if (getLetter(i, j) !== "A") continue;
      counter += X_MAS(i, j);
    }
  }
  return counter;
}

console.log(d41(data));
console.log(d42(data));
