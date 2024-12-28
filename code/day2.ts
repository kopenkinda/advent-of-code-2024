import { getInputFor } from "../utils/get-input.ts";

const data = getInputFor(
  2,
  (x) => x.split("\n").map((x) => x.split(" ").map(Number)),
  "inputs"
);

function d21(data: number[][]) {
  let safe = 0;
  for (let i = 0; i < data.length; i++) {
    let checked = true;
    const direction = data[i][1] - data[i][0] < 0 ? -1 : 1;
    for (let j = 1; j < data[i].length; j++) {
      const rawDiff = data[i][j] - data[i][j - 1];
      const diff = Math.abs(rawDiff);
      if (direction === -1 && rawDiff > 0) {
        checked = false;
        break;
      }
      if (direction === 1 && rawDiff < 0) {
        checked = false;
        break;
      }
      if (!(diff >= 1 && diff <= 3)) {
        checked = false;
        break;
      }
    }
    if (checked) {
      safe++;
    }
  }
  return safe;
}

function d22(data: number[][]) {
  let safe = 0;
  for (const line of data) {
    let direction = line[1] - line[0] < 0 ? -1 : 1;
    let isValid = true;
    for (let j = 1; j < line.length; j++) {
      const rawDiff = line[j] - line[j - 1];
      const diff = Math.abs(rawDiff);
      if (
        (direction === -1 && rawDiff > 0) ||
        (direction === 1 && rawDiff < 0) ||
        !(diff >= 1 && diff <= 3)
      ) {
        isValid = false;
        break;
      }
    }
    if (isValid) {
      safe++;
      continue;
    }
    for (let skip = 0; skip < line.length; skip++) {
      isValid = true;
      const filtered = line.filter((_, i) => i !== skip);
      direction = filtered[1] - filtered[0] < 0 ? -1 : 1;
      for (let j = 1; j < filtered.length; j++) {
        const rawDiff = filtered[j] - filtered[j - 1];
        const diff = Math.abs(rawDiff);
        if (
          (direction === -1 && rawDiff > 0) ||
          (direction === 1 && rawDiff < 0) ||
          !(diff >= 1 && diff <= 3)
        ) {
          isValid = false;
          break;
        }
      }
      if (isValid) {
        safe++;
        break;
      }
    }
  }
  return safe;
}

console.log(d21(data));
console.log(d22(data));
